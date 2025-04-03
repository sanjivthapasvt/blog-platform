from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import LoveViewSet

router = DefaultRouter()
router.register(r'love',LoveViewSet)


urlpatterns = [
    path("", include(router.urls), name="love")
]
