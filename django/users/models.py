from typing import Optional
import uuid
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.db import models


class User(AbstractUser):
    """User model."""
    email = None

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    EMAIL_FIELD = None
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def has_permission(self, obj=None):
        if self.is_superuser:
            return True
        elif obj == self:
            return True
        elif hasattr(obj, 'user') and obj.user == self:
            return True
        return False
