from django.shortcuts import render
from serializers import UserSerializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializers(data=request.data)
        if serializer.is_valid:
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                "message": "User created sucessfully",
                "tokens": tokens
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        if not username or not password:
            return Response({
                "error": "Please provide both username and password"}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username = username, password=password)
        if user:
            tokens = get_tokens_for_user(user)
            return Response({'tokens': tokens}, status=status.HTTP_200_OK)
        return Response({'error': "Invalid Credentiuals"}, status=status.HTTP_401_UNAUTHORIZED)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": "Error logging out", "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
