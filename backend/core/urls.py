from django.urls import path
from .views import RegisterView, LoginView, VerifyOTPView, UserDetailView, ResumeUploadView, CheckEmailExistsView, UserTestJsonView,UserTestFileUpload, UserDocumentsView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .views import JobPostListCreateView, JobPostDetailView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify/', VerifyOTPView.as_view(), name='verify_otp'),
    path('resume-parse/', ResumeUploadView.as_view(), name='upload-resume'),

    path('check-email/', CheckEmailExistsView.as_view(), name='check_email'),
    
    path("user/details/", UserDetailView.as_view(), name="user-details"),
    path("user-documents/", UserDocumentsView.as_view(), name="user-documents"),

    # jwt
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # Verify


    path('jobs/', JobPostListCreateView.as_view(), name='jobpost-list-create'),
    path('jobs/<int:pk>/', JobPostDetailView.as_view(), name='jobpost-detail'),


    # Testing
    path("user/test-upload/", UserTestFileUpload.as_view(), name="user-test"),
    path("user/test-json/", UserTestJsonView.as_view(), name="user-test"),
]