import uuid
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.db import models


class RoleChoices(models.TextChoices):
    ADMIN = 'admin', _('Administrador')
    CLIENT = 'client', _('Cliente')


class User(AbstractUser):
    """User model."""
    email = None

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=24, choices=RoleChoices.choices)

    EMAIL_FIELD = None
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
