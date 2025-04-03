from rest_framework import serializers
from .models import Love

class LoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Love
        fields = "__all__"