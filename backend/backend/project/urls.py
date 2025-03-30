from .views import ProjectViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'project',ProjectViewSet)

urlpatterns = [
    path('', include(router.urls), name="project")
]
