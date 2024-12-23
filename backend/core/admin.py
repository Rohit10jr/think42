from django.contrib import admin
from .models import OTP, User, PortfolioLink, Education, WorkExperience, PersonalInformation, AddressInformation, SkillSet, ResumeParse, UserDocuments
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.


class CustomUserAdmin(BaseUserAdmin):
    model = User
    list_display = ('email', 'mobile', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'mobile', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'mobile', 'password1', 'password2', 'is_staff', 'is_active', 'is_superuser'),
        }),
    )
    search_fields = ('email', 'mobile')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)

admin.site.register(OTP)
admin.site.register(PersonalInformation)
admin.site.register(AddressInformation)
admin.site.register(Education)
admin.site.register(WorkExperience)
admin.site.register(PortfolioLink)
admin.site.register(SkillSet)
admin.site.register(ResumeParse)
admin.site.register(UserDocuments)

