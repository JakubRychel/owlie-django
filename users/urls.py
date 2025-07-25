from django.urls import path
from .views import RegisterView, VerifyView, ResendVerificationTokenView, UserDetailView, UserExistsView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/verify/', VerifyView.as_view(), name='verify'),
    path('auth/resend-verification-token/', ResendVerificationTokenView.as_view(), name='resend_verification_token'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/current-user/', UserDetailView.as_view(), name='current_user'),
    path('users/user-exists/', UserExistsView.as_view(), name='user_exists')
]