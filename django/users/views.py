from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.authentication import JWTAuthentication

from users.serializers import UserTokenSerializer


class UserTokenObtainPairView(TokenViewBase):
    """User token obtain pair view."""
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            jwt_module = JWTAuthentication()
            token = jwt_module.get_validated_token(response.data['access'])
            user = jwt_module.get_user(token)
            user_serialized = UserTokenSerializer(user)
            response.data['user'] = user_serialized.data

        return response
