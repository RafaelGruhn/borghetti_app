from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from users.serializers import UserTokenSerializer, UserSerializer
from users.models import User


class UserTokenObtainPairView(TokenViewBase):
    """User token obtain pair view."""
    serializer_class = TokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            jwt_module = JWTAuthentication()
            token = jwt_module.get_validated_token(response.data['access'])
            user = jwt_module.get_user(token)
            user_serialized = UserTokenSerializer(user)
            response.data['user'] = user_serialized.data

        return response


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User model."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
