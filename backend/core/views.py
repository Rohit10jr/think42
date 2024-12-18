from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now
from .models import User, OTP, WorkExperience, Education, PortfolioLink, PersonalInformation, AddressInformation, ResumeParse, SkillSet
import random
from .utils import generate_otp, send_otp_via_email, extract_text 
from .serializers import SignupSerializer, VerifyOTPSerializer, UserDetailSerializer, ResumeParseSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import CreateAPIView


import os
import PyPDF2
import pdfplumber
from docx import Document
import google.generativeai as genai
import textwrap
import json
import environ
import os

class RegisterView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            mobile = serializer.validated_data.get('mobile')

            # print("views")  

            # Check if user exists
            user, created = User.objects.get_or_create(email=email, mobile=mobile)
            if not created:
                return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

            # Generate and save OTP
            otp_code = generate_otp()
            OTP.objects.create(user=user, code=otp_code, created_at=now())

            # Send OTP
            if email:
                email_sent = send_otp_via_email(email, otp_code)
                print(f'Sending OTP {otp_code} to email {email}')
                if not email_sent:
                    return Response({'error': 'Failed to send OTP via email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            elif mobile:
                print(f'Sending OTP {otp_code} to mobile {mobile}')  

            return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():

            email = request.data.get('email')
            mobile = request.data.get('mobile')

            # Check if user exists
            user = User.objects.filter(email=email).first() or User.objects.filter(mobile=mobile).first()
            if not user:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

            # Generate and save OTP
            otp_code = generate_otp()
            OTP.objects.create(user=user, code=otp_code, created_at=now())

            # Send OTP
            if email:
                email_sent = send_otp_via_email(email, otp_code)
                print(f'Sending OTP {otp_code} to email {email}')
                if not email_sent:
                    return Response({'error': 'Failed to send OTP via email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            elif mobile:
                print(f'Sending OTP {otp_code} to mobile {mobile}')

            return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            otp = serializer.validated_data['otp']
            user.is_active = True
            user.save()

            otp.delete()

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'message': 'OTP verified successfully. Redirecting...',
                'access': access_token,
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class VerifyOTPView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         mobile = request.data.get('mobile')
#         otp_code = request.data.get('otp')

#         # Retrieve user
#         user = User.objects.filter(email=email).first() or User.objects.filter(mobile=mobile).first()
#         if not user:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

#         # Validate OTP
#         otp = OTP.objects.filter(user=user, code=otp_code).first()
#         if not otp or (now() - otp.created_at).seconds > 300:  # 5-minute expiration
#             return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

#         # OTP is valid
#         user.is_active = True  # Mark user as active after registration
#         user.save()
#         otp.delete()  # Clean up used OTPs

#         return Response({'message': 'OTP verified successfully. Redirecting...'}, status=status.HTTP_200_OK)




class UserDetailView(APIView):
    """
    API endpoint to handle User Details with nested Personal Information,
    Educational Background, Work Experience, and Portfolio.
    """
    authentication_classes = [JWTAuthentication]  # Enable JWT Authentication
    permission_classes = [IsAuthenticated]       # Require the user to be authenticated

    def get(self, request, *args, **kwargs):
        user = request.user  # Authenticated user

        # Fetch the user's personal information
        personal_information = PersonalInformation.objects.filter(user=user).first()
        address_information = AddressInformation.objects.filter(user=user).first()

        # Fetch related data
        educational_background = Education.objects.filter(user=user)
        work_experience = WorkExperience.objects.filter(user=user)
        skill_set = SkillSet.objects.filter(user=user).first()
        portfolio = PortfolioLink.objects.filter(user=user).first()

        # Serialize the data
        data = {
            "personal_information": personal_information,
            "address_information": address_information,
            "educational_background": educational_background,
            "work_experience": work_experience,
            "skill_set": skill_set,
            "portfolio": portfolio,
        }
        serializer = UserDetailSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create or update user details.
        """
        serializer = UserDetailSerializer(data=request.data, context={"user": request.user})
        print("s-1")
        if serializer.is_valid():
            print("s-2")
            serializer.save()
            print("s-3")
            return Response({"message": "User details saved successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        """
        Update user details.
        """
        serializer = UserDetailSerializer(data=request.data, context={"user": request.user})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User details updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


# class ResumeUploadView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = ResumeParseSerializer(data=request.data)
#         if serializer.is_valid():
#             resume_instance = serializer.save()
#             # Call your parsing function here and pass the file path
#             # Example: parsed_data = parse_resume(resume_instance.resume_file.path)
#             return Response({
#                 'message': 'Resume uploaded successfully',
#                 'resume_id': resume_instance.id
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


# class ResumeUploadView(CreateAPIView):
#     queryset = ResumeParse.objects.all()
#     serializer_class = ResumeParseSerializer


# Initialize environ
env = environ.Env()

# Define BASE_DIR if not already defined
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Read the .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))


genai.configure(api_key= env('GEMINI_API_KEY'))



# JSON structure for parsing
json_structure = {
    "personal_information": {"full_name": "", "email": "", "mobile": ""},
    "address_information": {"address": "", "city": "", "state": "", "zip_code": "", "country": ""},
    "educational_background": [
        {"degree": "", "institution": "", "field_of_study": "", "graduation_year": "", "gpa": ""},
        {"degree": "", "institution": "", "field_of_study": "", "graduation_year": "", "gpa": ""}
    ],
    "work_experience": [
        {"job_title": "", "company_name": "", "start_date": "", "end_date": "", "responsibilities": ""},
        {"job_title": "", "company_name": "", "start_date": "", "end_date": "", "responsibilities": ""}
    ],
    "skill_set": {
      "skills": [],
    },
    "portfolio": {"linkedin_url": "", "github_url": "", "other_url": ""},
}

def gemini_prompt(resume_text, urls, json_structure):
    prompt = textwrap.dedent(f"""
        You are an advanced AI model specialized in extracting structured information from resumes.
        Use the provided resume text, resume Url to generate a JSON object that matches the given structure. 
        Ensure that all relevant fields in the JSON structure are filled accurately based on the resume text. 
        If any information is missing in the resume, leave those fields blank in the JSON.

        Resume Text:
        {resume_text}

        Resume Url:
        {urls}

        JSON Structure:
        {json_structure}

        Output the filled JSON:
    """)
    return prompt


# class ResumeUploadAndParseView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = ResumeParseSerializer(data=request.data)
#         if serializer.is_valid():
#             # Save the uploaded file
#             resume_instance = serializer.save()
#             file_path = resume_instance.resume_file.path

#             # Extract text from the file
#             resume_text = extract_text(file_path)
#             if not resume_text:
#                 return Response({"error": "Failed to extract text from the file."}, status=status.HTTP_400_BAD_REQUEST)

#             # Generate JSON using GenAI
#             prompt = gemini_prompt(resume_text, json_structure)
#             gen_model = genai.GenerativeModel("gemini-1.5-flash")
#             try:
#                 final_json_answer = gen_model.generate_content(prompt)
#                 generated_content = final_json_answer._result.candidates[0].content.parts[0].text
#             except Exception as e:
#                 return Response({"error": f"AI parsing failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#             return Response({
#                 "message": "Resume uploaded and parsed successfully",
#                 "parsed_data": generated_content
#             }, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ResumeUploadView(CreateAPIView):
    queryset = ResumeParse.objects.all()
    serializer_class = ResumeParseSerializer

    def perform_create(self, serializer):
        # Save the uploaded file
        resume_instance = serializer.save()
        file_path = resume_instance.resume_file.path

        # Extract text from the file
        resume_text, urls = extract_text(file_path)
        resume_text = extract_text(file_path)
        if not resume_text:
            raise ValueError("Failed to extract text from the file.")

        # Generate JSON using GenAI
        prompt = gemini_prompt(resume_text, urls, json_structure)
        gen_model = genai.GenerativeModel("gemini-1.5-flash")
        try:
            final_json_answer = gen_model.generate_content(prompt)
            generated_content = final_json_answer._result.candidates[0].content.parts[0].text
            # print(generated_content)
        except Exception as e:
            raise ValueError(f"AI parsing failed: {str(e)}")

        # Save parsed data or log as needed
        self.generated_data = generated_content  # Save for access in response

    def create(self, request, *args, **kwargs):
        # Override create to include additional response data
        response = super().create(request, *args, **kwargs)
        if hasattr(self, 'generated_data'):
            response.data['parsed_data'] = self.generated_data
        response.data['message'] = "Resume uploaded and parsed successfully"
        return response




# check profile email with the user email

class CheckEmailExistsView(APIView):
    """
    API endpoint to check if an email is already associated with an account,
    excluding the logged-in user's email.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        email = request.data.get('email')
        user = request.user  # Get the logged-in user

        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

       
        email_exists = User.objects.filter(email=email).exclude(id=user.id).exists()

        if email_exists:
            return Response({
                "available": False,
                "message": "Email is already in use by another account. Please use a different email."
            }, status=status.HTTP_200_OK)

        return Response({
            "available": True,
            "message": "Email is available."
        }, status=status.HTTP_200_OK)
