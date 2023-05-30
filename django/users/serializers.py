from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from users.models import User


class UserTokenSerializer(serializers.ModelSerializer):
    """User token serializer."""

    class Meta:
        model = get_user_model()
        fields = [
            'id', 'first_name', 'last_name', 'username', 'is_superuser', 'is_staff', 'is_active',
        ]


class UserSerializer(serializers.ModelSerializer):
    """User serializer."""

    class Meta:
        model = get_user_model()
        fields = [
            'id', 'first_name', 'last_name', 'username', 'is_superuser', 'is_staff', 'is_active',
        ]

