from .serializers import LoveSerializer, Love
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAdminUser, AllowAny
# Create your views here.

class LoveViewSet(viewsets.ModelViewSet):
    queryset = Love.objects.all()
    serializer_class = LoveSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAdminUser]