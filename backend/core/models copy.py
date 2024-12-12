from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email=None, mobile=None, password=None):
        if not email and not mobile:
            raise ValueError("Users must provide either an email or mobile number")
        
        user = self.model(
            email=self.normalize_email(email) if email else None,
            mobile=mobile
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email=None, mobile=None, password=None):
        if not email and not mobile:
            raise ValueError("Superusers must provide either an email or mobile number")
    
        user = self.create_user(email, mobile, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(_('email address'), unique=True, null=True, blank=True)
    mobile = models.CharField(_('mobile number'), max_length=15, unique=True, null=True, blank=True)
    
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('superuser status'), default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'  # Set primary identifier
    REQUIRED_FIELDS = []  # Leave empty, as either email or mobile is enough

    def __str__(self):
        return self.email or self.mobile

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True
