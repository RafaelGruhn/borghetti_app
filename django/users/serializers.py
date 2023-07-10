from rest_framework import serializers
from django.contrib.auth import get_user_model


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
            'id', 'first_name', 'last_name', 'username', 'is_active', 'password',
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password')
        user = super().update(instance, validated_data)
        user.set_password(password)
        user.save()
        return user
