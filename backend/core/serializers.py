from rest_framework import serializers
from .models import User, OTP
from django.utils.timezone import now

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_active', 'is_staff', 'is_superuser']
        read_only_fields = ['is_active', 'is_staff', 'is_superuser']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = super().create(validated_data)
        if password:
            instance.set_password(password)
            instance.save()
        return instance


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    mobile = serializers.CharField(required=False, max_length=15)
    otp = serializers.CharField(max_length=6)

    def validate(self, attrs):
        email = attrs.get('email')
        mobile = attrs.get('mobile')
        otp_code = attrs.get('otp')

        if not email and not mobile:
            raise serializers.ValidationError("Either email or mobile is required.")
        if not otp_code:
            raise serializers.ValidationError("OTP is required.")

        # Check if the user exists
        user = User.objects.filter(email=email).first() or User.objects.filter(mobile=mobile).first()
        if not user:
            raise serializers.ValidationError("User not found.")

        # Check if the OTP is valid
        otp = OTP.objects.filter(user=user, code=otp_code).first()
        if not otp:
            raise serializers.ValidationError("Invalid OTP.")
        if (now() - otp.created_at).seconds > 300:  # 5-minute expiration
            raise serializers.ValidationError("OTP has expired.")

        # Pass validated user and OTP for further processing
        attrs['user'] = user
        attrs['otp'] = otp
        return attrs
    

# class RegisterSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=False)
#     mobile = serializers.CharField(required=False, max_length=15)

#     def validate(self, attrs):
#         return super().validate(attrs)
    

class SignupSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    mobile = serializers.CharField(required=False, max_length=15)

    def validate(self, attrs):
        email = attrs.get('email')
        mobile = attrs.get('mobile')

        print("serializer")

        if not email and not mobile:
            raise serializers.ValidationError("Either email or mobile is required.")

        return attrs