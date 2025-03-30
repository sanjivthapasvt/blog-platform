from .models import Project
from rest_framework import serializers

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        
    def validate(self, attrs):
        if not attrs.get('title'):
            raise serializers.ValidationError({"detail": "You must have title"})
        return attrs