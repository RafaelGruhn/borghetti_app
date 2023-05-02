import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class RoleChoices(models.TextChoices):
    ADMIN = 'admin', _('Administrador')
    CLIENT = 'client', _('Cliente')


class ProductType(models.Model):
    """Product Type Model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(verbose_name=_('Nome'), max_length=128)

    class Meta:
        verbose_name = _('Tipo de Produto')
        verbose_name_plural = _('Tipo de Produtos')


class Product(models.Model):
    """Product Model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(verbose_name=_('Nome'), max_length=128)
    kind = models.ForeignKey(ProductType, verbose_name=_('Tipo'), on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Produto')
        verbose_name_plural = _('Produtos')
