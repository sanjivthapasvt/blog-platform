from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="API",
        default_version='v1',
        description="Interactive API docs with JWT Auth",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    authentication_classes=[],
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),
    path('api/', include('posts.urls')),
    
    # Schema Generation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Swagger UI
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # Redoc
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc')
]
