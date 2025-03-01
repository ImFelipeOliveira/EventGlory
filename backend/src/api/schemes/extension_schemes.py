from drf_social_oauth2.authentication import SocialAuthentication
from drf_spectacular.extensions import OpenApiAuthenticationExtension


class SocialAuthScheme(OpenApiAuthenticationExtension):
    target_class = SocialAuthentication
    name = "SocialAuth"

    def get_security_definition(self, auto_schema):
        return {
            "type": "oauth2",
            "flows": {
                "password": {
                    "tokenUrl": "/auth/token/",
                    "refreshUrl": "/auth/token/refresh/",
                    "scopes": {},
                }
            },
        }
