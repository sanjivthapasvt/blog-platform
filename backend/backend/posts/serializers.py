from .models import Post, Comment
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        
    def validate(self, data):
        if not data.get('title') and not data.get('img'):
            raise serializers.ValidationError({"detail": "Post must have title or image"})
        return data

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
    
    def validate(self, data):
        if not data.get('content'):
            raise serializers.ValidationError({"detail": "please enter some text"})
        
    def validate_post(self, value):
        if not Post.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("The post does not exist.")
        return value