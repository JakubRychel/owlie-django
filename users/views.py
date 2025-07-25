import random
from django.shortcuts import render
from django.contrib.auth import get_user_model
from .models import VerificationToken
from .serializers import RegisterSerializer, UserSerializer
from .utils import send_verification_email
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

User = get_user_model()

def generate_verification_token():
    return f'{random.randint(0, 999999):06}'

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        token = generate_verification_token()
        token_obj = VerificationToken.objects.create(token=token)
        user.verification_token = token_obj
        user.save()

        send_verification_email(user, token)

        return user
    
class VerifyView(APIView):
    def post(self, request):
        username = request.data.get('username')
        request_token = str(request.data.get('token'))

        try:
            user = User.objects.get(username=username)
        except:
            return Response({'is_verified': False, 'error': 'User not found'}, status=400)

        user_token = user.verification_token

        if not user_token or user_token.token != request_token: 
            return Response({'is_verified': False, 'error': 'Invalid token'}, status=400)
        if user_token.is_expired():
            user_token.delete()
            user.verification_token = None
            user.save()
            return Response({'is_verified': False, 'error': 'Token expired'}, status=400)
        
        user.is_verified = True
        user_token.delete()
        user.verification_token = None
        user.save()

        return Response({'is_verified': True, 'message': 'User verified successfully'}, status=200)
    
class ResendVerificationTokenView(APIView):
    def post(self, request):
        username = request.data.get('username')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=400)
        
        if user.is_verified:
            return Response({'message': 'User is already verified'}, status=400)
        
        if user.verification_token:
            user.verification_token.delete()
            user.verification_token = None
            user.save()

        token = generate_verification_token()
        token_obj = VerificationToken.objects.create(token=token)
        user.verification_token = token_obj
        user.save()

        send_verification_email(user, token)

        return Response({'message': 'Verification token resent successfully'}, status=200)
    
class UserExistsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user_exists = User.objects.filter(**request.query_params.dict()).exists()
        return Response({'user_exists': user_exists})