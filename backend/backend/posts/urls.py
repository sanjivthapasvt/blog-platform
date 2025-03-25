from django.urls import path,include
from .views import PostViewSet, CommentViewSet
from rest_framework.routers import DefaultRouter

#for viewset router
router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'posts/(?P<post_pk>\d+)/comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]