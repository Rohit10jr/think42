from rest_framework import serializers
from .models import User, OTP, PersonalInformation, Education, WorkExperience, PortfolioLink
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
    


class PersonalInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInformation
        exclude = ["user"]  # User is handled separately
    
    def create(self, validated_data):
        user = self.context['user']  # Set user from context
        validated_data['user'] = user
        return super().create(validated_data)


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        exclude = ["user"]

    def create(self, validated_data):
        user = self.context['user']  
        validated_data['user'] = user
        return super().create(validated_data)


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        exclude = ["user"]

    def create(self, validated_data):
        user = self.context['user']  
        validated_data['user'] = user
        return super().create(validated_data)


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioLink
        exclude = ["user"]

    def create(self, validated_data):
        user = self.context['user']  # Set user from context
        validated_data['user'] = user
        return super().create(validated_data)
    
    # def validate_url(self, value):
    #     if not value.startswith("http"):
    #         raise serializers.ValidationError("Invalid URL. It must start with 'http'.")
    #     return value


class UserDetailSerializer(serializers.Serializer):
    personal_information = PersonalInformationSerializer()
    educational_background = EducationSerializer(many=True)
    work_experience = WorkExperienceSerializer(many=True)
    portfolio = PortfolioSerializer(many=True)

    def create(self, validated_data):
        user = self.context['user']

        # Save personal information
        personal_info_data = validated_data.pop('personal_information', None)
        if personal_info_data:
            PersonalInformation.objects.update_or_create(user=user, defaults=personal_info_data)

        # Save educational background
        education_data = validated_data.pop('educational_background', [])
        for edu in education_data:
            Education.objects.create(user=user, **edu)

        # Save work experience
        work_experience_data = validated_data.pop('work_experience', [])
        for work in work_experience_data:
            WorkExperience.objects.create(user=user, **work)

        # Save portfolio links
        portfolio_data = validated_data.pop('portfolio', [])
        PortfolioLink.objects.filter(user=user).delete()  # Clear old links
        for link in portfolio_data:
            PortfolioLink.objects.create(user=user, **link)

        return validated_data