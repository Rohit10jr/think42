from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now
from .models import User, OTP
import random
from .utils import generate_otp, send_otp_via_email
from .serializers import SignupSerializer, VerifyOTPSerializer


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

            return Response({'message': 'OTP verified successfully. Redirecting...'}, status=status.HTTP_200_OK)

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




# from django.http import Http404
# from django.shortcuts import render, redirect
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.decorators import login_required
# from django.urls import reverse
# from rest_framework import generics, status
# from rest_framework.exceptions import ValidationError
# from django.utils import timezone
# import pyotp
# from .models import User, OTP