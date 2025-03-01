from drf_social_oauth2.views import (
    ConvertTokenView,
    DisconnectBackendView,
    InvalidateRefreshTokens,
    InvalidateSessions,
    RevokeTokenView,
    TokenView,
)
from drf_spectacular.utils import extend_schema
from rest_framework import serializers


# Serializers vazios para todas as views
class EmptyRequestSerializer(serializers.Serializer):
    pass


class TokenResponseSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    refresh_token = serializers.CharField()
    expires_in = serializers.IntegerField()


# Views customizadas
@extend_schema(
    request=EmptyRequestSerializer,
    responses=TokenResponseSerializer,
)
class CustomTokenView(TokenView):
    serializer_class = EmptyRequestSerializer


@extend_schema(
    request=EmptyRequestSerializer,
    responses={200: EmptyRequestSerializer},
)
class CustomConvertTokenView(ConvertTokenView):
    serializer_class = EmptyRequestSerializer


@extend_schema(
    request=EmptyRequestSerializer,
    responses={200: EmptyRequestSerializer},
)
class CustomRevokeTokenView(RevokeTokenView):
    serializer_class = EmptyRequestSerializer


@extend_schema(
    request=EmptyRequestSerializer,
    responses={200: EmptyRequestSerializer},
)
class CustomDisconnectBackendView(DisconnectBackendView):
    serializer_class = EmptyRequestSerializer


@extend_schema(
    request=EmptyRequestSerializer,
    responses={200: EmptyRequestSerializer},
)
class CustomInvalidateSessions(InvalidateSessions):
    serializer_class = EmptyRequestSerializer


@extend_schema(
    request=EmptyRequestSerializer,
    responses={200: EmptyRequestSerializer},
)
class CustomInvalidateRefreshTokens(InvalidateRefreshTokens):
    serializer_class = EmptyRequestSerializer
