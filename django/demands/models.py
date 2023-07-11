import uuid
import datetime

from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import User
from products.models import Product


class DemandStatusChoices(models.TextChoices):
    """Demand Status Choices"""
    PENDING = 'pending', _('Pendente')
    APPROVED = 'approved', _('Aprovado')
    REJECTED = 'rejected', _('Rejeitado')
    CANCELED = 'canceled', _('Cancelado')
    DELIVERED = 'delivered', _('Entregue')


class Demand(models.Model):
    """Demand Model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(User, verbose_name=_('Cliente'), on_delete=models.CASCADE)
    status = models.CharField(
        _('Status'), max_length=10, choices=DemandStatusChoices.choices,
        default=DemandStatusChoices.PENDING)
    created_at = models.DateTimeField(_('Criado em'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Atualizado em'), auto_now=True)
    demand_date = models.DateField(_('Data da Demanda'), default=datetime.date.today)
    observation = models.TextField(_('Observação'), blank=True, null=True)

    class Meta:
        verbose_name = _('Demanda')
        verbose_name_plural = _('Demandas')

    def get_products(self):
        return self.products.all()

    def total_value(self):
        total = 0
        try:
            for demand_product in self.get_products():
                total += (demand_product.product.price * demand_product.quantity)
        except Exception:
            pass
        return round(total, 2)


class DemandProduct(models.Model):
    """Demand Products Model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    demand = models.ForeignKey(Demand, verbose_name=_('Demanda'), related_name='products', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, verbose_name=_('Produto'), on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(_('Quantidade'))

    class Meta:
        verbose_name = _('Produto da Demanda')
        verbose_name_plural = _('Produtos da Demanda')
