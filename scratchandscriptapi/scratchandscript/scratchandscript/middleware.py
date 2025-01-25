from django.utils.deprecation import MiddlewareMixin
from rest_framework.exceptions import AuthenticationFailed
from keycloak import KeycloakOpenID
from django.conf import settings
from django.contrib.auth.models import User

keycloak_openid = KeycloakOpenID(
    server_url=settings.KEYCLOAK_SERVER_URL,
    realm_name=settings.KEYCLOAK_REALM,
    client_id=settings.KEYCLOAK_CLIENT_ID,
    client_secret_key=settings.KEYCLOAK_CLIENT_SECRET_KEY,
)

class KeycloakMiddleware(MiddlewareMixin):
    EXCLUDED_ROUTES = [
        '/api/auth/register',
        '/',
    ]
    def process_request(self, request):
        if request.path in self.EXCLUDED_ROUTES:
            return
        token = request.headers.get('Authorization')
        if not token:
            raise AuthenticationFailed("No token provided")

        token = token.split(" ")[1] if " " in token else token
        try:
            user_info = keycloak_openid.userinfo(token)
            user = User.objects.get(username=user_info["preferred_username"])
            print(f"Token : {user_info}")
            request.user = user
        except Exception as e:
            raise AuthenticationFailed(f"Invalid or expired token: {str(e)}")