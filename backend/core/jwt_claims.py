from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta


def generate_tokens_with_user_type(user):
    refresh = RefreshToken.for_user(user)
    access_token = refresh.access_token
    access_token['user_type'] = user.user_type

    return {
        'refresh': str(refresh),
        'access': str(access_token),
    }


def custom_jwt_payload(user):
    """
    Custom JWT payload handler to include user type.
    """
    # payload = {
    #     'user_id': user.id,
    #     'user_email': user.email,
    #     # 'user_type': user.user_type,  
    #     # 'exp': RefreshToken.for_user(user).access_token.payload['exp'],
    #     'user_type': user.user_type,  # Include user_type here
    #     'exp': datetime.utcnow() + timedelta(minutes=30),  # Access token expiration
    #     'iat': datetime.utcnow(),  # Issued at time
    # }
    # return payload

    print(
        'user_id', user.id,
        'user_type', user.user_type, 
    )

    return {
        'user_id': user.id,
        'user_type': user.user_type, 
        'exp': datetime.now(datetime.timezone.utc) + timedelta(minutes=30),  
        'iat': datetime.now(datetime.timezone.utc),  
    }


