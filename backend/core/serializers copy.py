from rest_framework import serializers
from .models import User, OTP, PersonalInformation, AddressInformation, Education, WorkExperience, PortfolioLink, ResumeParse, SkillSet, UserDocuments, UserDocumentsTest, PortfolioTest
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
    
    # def create(self, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
    #     validated_data['user'] = user
    #     return super().create(validated_data)
    
    # def update(self, instance, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
        
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)

    #     instance.user = user
    #     instance.save()
    #     return instance



class AddressInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressInformation
        exclude = ["user"]  # User is handled separately
    
    # def create(self, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
    #     validated_data['user'] = user
    #     return super().create(validated_data)
    
    # def update(self, instance, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
        
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)

    #     instance.user = user
    #     instance.save()
    #     return instance


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        exclude = ["user"]

    # def create(self, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
    #     validated_data['user'] = user
    #     return super().create(validated_data)
    
    # def update(self, instance, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
        
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)

    #     instance.user = user
    #     instance.save()
    #     return instance
    
class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        exclude = ["user"]

    # def create(self, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
    #     validated_data['user'] = user
    #     return super().create(validated_data)
    
    # def update(self, instance, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
        
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)

    #     instance.user = user
    #     instance.save()
    #     return instance

class SkillsetSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillSet
        exclude = ["user"]

    # def create(self, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
    #     validated_data['user'] = user
    #     return super().create(validated_data)
    
    # def update(self, instance, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
        
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)

    #     instance.user = user
    #     instance.save()
    #     return instance
        

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioLink
        exclude = ["user"]

    # def create(self, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
    #     validated_data['user'] = user
    #     return super().create(validated_data)
    
    # def update(self, instance, validated_data):
    #     user = validated_data.pop('user', None)
    #     if not user:
    #         raise serializers.ValidationError({"user": "User must be provided."})
        
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)

    #     instance.user = user
    #     instance.save()
    #     return instance
    
    # def validate_url(self, value):
    #     if not value.startswith("http"):
    #         raise serializers.ValidationError("Invalid URL. It must start with 'http'.")
    #     return value

class UserDocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDocuments
        # fields = ['resume', 'cover_letter']
        exclude = ["user"]

    def create(self, validated_data):
        user = self.context['user']  
        validated_data['user'] = user
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        instance.resume = validated_data.get('resume', instance.resume)
        instance.cover_letter = validated_data.get('cover_letter', instance.cover_letter)
        instance.save()
        return instance


class UserDetailSerializer(serializers.Serializer):
    personal_information = PersonalInformationSerializer()
    address_information = AddressInformationSerializer()
    educational_background = EducationSerializer(many=True)
    work_experience = WorkExperienceSerializer(many=True)
    skill_set = SkillsetSerializer()
    portfolio = PortfolioSerializer()
    # documents = UserDocumentsSerializer()

    def create(self, validated_data):
        user = self.context['user']
        
        personal_info_data = validated_data.pop('personal_information', None)
        if personal_info_data:
            PersonalInformation.objects.update_or_create(user=user, defaults=personal_info_data)   

        address_info_data = validated_data.pop('address_information', None)
        if personal_info_data:
            AddressInformation.objects.update_or_create(user=user, defaults=address_info_data)
        
        # Personal Information
        # personal_info_data = validated_data.pop('personal_information', None)
        # if personal_info_data:
        #     personal_serializer = PersonalInformationSerializer()
        #     personal_serializer.create({**personal_info_data, "user": user})
        
        # Address Information
        # address_info_data = validated_data.pop('address_information', None)
        # if address_info_data:
        #     address_serializer = AddressInformationSerializer()
        #     address_serializer.create({**address_info_data, "user": user})
        
        # Work Experience
        work_experience_data = validated_data.pop('work_experience', [])
        if work_experience_data:
            WorkExperience.objects.filter(user=user).delete()
            for work in work_experience_data:
                work_experience_data.create({**work, "user": user})
        
        # Educational Background
        education_data = validated_data.pop('educational_background', [])
        if education_data:
            Education.objects.filter(user=user).delete()
            for edu in education_data:
                education_serializer = EducationSerializer()
                education_serializer.create({**edu, "user": user})

        # Skill Set
        # skill_info = validated_data.pop('skill_set', None)
        # if skill_info:
        #     skill_serializer = SkillsetSerializer()
        #     skill_serializer.create({**skill_info, "user": user})
        
        # Portfolio
        # portfolio_data = validated_data.pop('portfolio', None)
        # if portfolio_data:
        #     portfolio_serializer = PortfolioSerializer()
        #     portfolio_serializer.create({**portfolio_data, "user": user})

        portfolio_data = validated_data.pop('portfolio', None)
        if portfolio_data:
            PortfolioLink.objects.update_or_create(user=user, defaults=portfolio_data)

        skill_info = validated_data.pop('skill_set', None)
        if skill_info:
            SkillSet.objects.update_or_create(user=user, defaults=skill_info)

        return validated_data

    # def update(self, instance, validated_data):
    #     user = self.context['user']
        
    #     # Personal Information
    #     personal_info_data = validated_data.pop('personal_information', None)
    #     address_info_data = validated_data.pop('address_information', None)
    #     work_experience_data = validated_data.pop('work_experience', [])
    #     education_data = validated_data.pop('educational_background', [])
    #     portfolio_data = validated_data.pop('portfolio', None)
    #     skill_info = validated_data.pop('skill_set', None)


    #     if personal_info_data:
    #         personal_info_data.update(
    #             PersonalInformation.objects.filter(user=user).first(),
    #             {**personal_info_data, "user": user}
    #         )

    #     if address_info_data:
    #         address_serializer = AddressInformationSerializer()
    #         address_serializer.update(
    #             AddressInformation.objects.filter(user=user).first(),
    #             {**address_info_data, "user": user}
    #         )
        
    #     for work in work_experience_data:
    #         existing_work = WorkExperience.objects.filter(user=user, **work).first()
    #         work_serializer = WorkExperienceSerializer()
    #         if existing_work:
    #             work_serializer.update(existing_work, {**work, "user": user})
    #         else:
    #             work_serializer.create({**work, "user": user})
        
    #     for edu in education_data:
    #         existing_edu = Education.objects.filter(user=user, **edu).first()
    #         education_serializer = EducationSerializer()
    #         if existing_edu:
    #             education_serializer.update(existing_edu, {**edu, "user": user})
    #         else:
    #             education_serializer.create({**edu, "user": user})
        
    #     if portfolio_data:
    #         portfolio_data.update(
    #             PortfolioLink.objects.filter(user=user).first(),
    #             {**portfolio_data, "user": user}
    #         )

    #     if skill_info:
    #         skill_serializer = SkillsetSerializer()
    #         skill_serializer.update(
    #             SkillSet.objects.filter(user=user).first(),
    #             {**skill_info, "user": user}
    #         )

    #     return validated_data

        
        # documents_data = validated_data.pop('resume', None)
        # if documents_data:
        #     # resume_file = self.context['request'].FILES.get('documents[resume]')
        #     resume_file = self.context['request'].FILES.get('resume')
        #     if resume_file: 
        #         UserDocuments.objects.update_or_create(
        #             user=user, defaults={'resume': resume_file}
        #             # user=user, defaults={'resume': resume_file} if resume_file else {}
        #         )

        # documents_data = validated_data.pop('documents', None)
        # if documents_data:
        #     UserDocuments.objects.update_or_create(user=user, defaults=documents_data)

        # return validated_data
        # return user
        
    def is_valid(self, raise_exception=False):
        valid = super().is_valid(raise_exception=False)
        if not valid:
            print("Validation errors:", self.errors)
        return valid

    # def update(self, instance, validated_data):
    #     return self.create(validated_data)
    


class ResumeParseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeParse
        fields = ['id', 'resume_file', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']



#############################################
# Test serializer
#############################################


class PortfolioTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioTest
        fields = ['linkedin_url']

class UserDocumentsTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDocumentsTest
        fields = ['resume']


# class UserTestSerializer(serializers.Serializer):
#     # portfolio_links = PortfolioTestSerializer()
#     portfolio_links = serializers.JSONField()
#     # documents = UserDocumentsTestSerializer(required=False)

#     def create(self, validated_data):
#         # Extract nested data
#         portfolio_data = validated_data.pop('portfolio_links', None)
#         documents_data = validated_data.pop('resume', None)
        
#         # Create the User
#         user = self.context['user']
#         # user = User.objects.create(**validated_data)
        
#         if portfolio_data: 
#             PortfolioTest.objects.update_or_create(user=user,defaults=portfolio_data)
#         if documents_data:
#             # resume_file = self.context['request'].FILES.get('documents[resume]')
#             resume_file = self.context['request'].FILES.get('resume')
#             if resume_file: 
#                 UserDocumentsTest.objects.update_or_create(
#                     user=user, defaults={'resume': resume_file}
#                     # user=user, defaults={'resume': resume_file} if resume_file else {}
#                 )
        
#         return validated_data
#         # return user
  

    

class UserTestSerializer(serializers.Serializer):
    portfolio_links = serializers.JSONField() 
    documents = UserDocumentsTestSerializer(required=False)

    def create(self, validated_data):
        # Extract nested data
        portfolio_data = validated_data.pop('portfolio_links', None)
        user = self.context['user']
        
        if portfolio_data: 
            PortfolioTest.objects.update_or_create(user=user,defaults=portfolio_data)
       
        return validated_data
        
    
    def is_valid(self, raise_exception=False):
        valid = super().is_valid(raise_exception=False)
        if not valid:
            print("Validation errors:", self.errors)
        return valid 