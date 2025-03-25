from .models import Post, Comment
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        
    def validate(self, data):
        if not data.get('title') and not data.get('img'):
            raise serializers.ValidationError({"detail": "Enter title or upload image"})
        return data

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
    
    def validate(self, data):
        if not data.get('text'):
            raise serializers.ValidationError({"detail": "please enter some text"})