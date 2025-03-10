"""URL configuration for eventglory project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/

Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.schemes.oauth2_schemas import (
    CustomConvertTokenView,
    CustomDisconnectBackendView,
    CustomInvalidateRefreshTokens,
    CustomInvalidateSessions,
    CustomRevokeTokenView,
    CustomTokenView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    # Simple-JWT
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # DRF-social-Oauth2
    path("oauth/token/", CustomTokenView.as_view(), name="token"),
    path("oauth/convert-token/", CustomConvertTokenView.as_view(), name="convert_token"),
    path("oauth/revoke-token/", CustomRevokeTokenView.as_view(), name="revoke_token"),
    path("oauth/disconnect/", CustomDisconnectBackendView.as_view(), name="disconnect_backend"),
    path("oauth/invalidate-sessions/", CustomInvalidateSessions.as_view(), name="invalidate_sessions"),
    path("oauth/invalidate-refresh-tokens/", CustomInvalidateRefreshTokens.as_view(), name="invalidate_refresh_tokens"),
    # Documentation
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
