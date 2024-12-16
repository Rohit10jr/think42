from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models 
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import random

class CustomUserManager(BaseUserManager):
    def create_user(self, email=None, mobile=None, password=None):
        if not email and not mobile:
            raise ValueError("Users must provide either an email or a mobile number")
        
        user = self.model(
            email=self.normalize_email(email) if email else None,
            mobile=mobile if mobile else None,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email=None, mobile=None, password=None):
        if not email and not mobile:
            raise ValueError("Superusers must provide either an email or mobile number")
        
        user = self.create_user(email=email, mobile=mobile, password=password)
        user.is_staff = True
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True, null=True, blank=True)
    mobile = models.CharField(_('mobile number'), max_length=15, unique=True, null=True, blank=True)
    
    is_active = models.BooleanField(_('active'), default=False)  
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('superuser status'), default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    # REQUIRED_FIELDS = ['mobile']

    def __str__(self):
        return self.email or self.mobile
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label): 
        return True

   
class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def is_valid(self):
        return timezone.now() - self.created_at < timezone.timedelta(minutes=10)

    def __str__(self):
        return f"OTP for {self.user}"


class PersonalInformation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="personal_info")
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    # address = models.TextField()
    # city = models.CharField(max_length=100)
    # state = models.CharField(max_length=100)
    # zip_code = models.CharField(max_length=10)
    # country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.full_name}"
    
class AddressInformation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="address_info")
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user} {self.city}"

 
class Education(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="education")
    degree = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    graduation_year = models.PositiveSmallIntegerField()
    gpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)


class WorkExperience(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="work_experience")
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    responsibilities = models.TextField()


class PortfolioLink(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="portfolio_links")
    link_type = models.CharField(max_length=50)  # Example: "LinkedIn", "GitHub", "Portfolio"
    url = models.URLField()
