from keycloak import KeycloakOpenID
from django.conf import settings

def validate_keycloak_token(token):
    keycloak_openid = KeycloakOpenID(
        server_url=settings.KEYCLOAK_SERVER_URL,
        client_id=settings.KEYCLOAK_CLIENT_ID,
        realm_name=settings.KEYCLOAK_REALM,
        client_secret_key=settings.KEYCLOAK_CLIENT_SECRET_KEY,
    )
    try:
        keycloak_openid.introspect(token)
        return True
    except Exception as e:
        print(f"Token validation failed: {e}")
        return False