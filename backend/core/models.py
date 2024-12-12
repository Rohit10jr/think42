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
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(_('email address'), unique=True, null=True, blank=True)
    mobile = models.CharField(_('mobile number'), max_length=15, unique=True, null=True, blank=True)
    
    is_active = models.BooleanField(_('active'), default=False)  
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('superuser status'), default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['mobile']

    def __str__(self):
        return self.email or self.mobile
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_prems(self, app_label):
        return True

   
class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def is_valid(self):
        return timezone.now() - self.created_at < timezone.timedelta(minutes=10)

    def __str__(self):
        return f"OTP for {self.user}"