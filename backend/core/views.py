from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now
from .models import User, OTP, WorkExperience, Education, PortfolioLink, PersonalInformation, AddressInformation
import random
from .utils import generate_otp, send_otp_via_email
from .serializers import SignupSerializer, VerifyOTPSerializer, UserDetailSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

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
        portfolio = PortfolioLink.objects.filter(user=user)

        # Serialize the data
        data = {
            "personal_information": personal_information,
            "address_information": address_information,
            "educational_background": educational_background,
            "work_experience": work_experience,
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