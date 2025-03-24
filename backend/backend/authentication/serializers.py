from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password', 'confirm_password', 'email']
    
    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError({"password": "password do not match"})
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')

        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError({'username': 'username is already taken'})

        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'email': 'email is already used'})
        
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user