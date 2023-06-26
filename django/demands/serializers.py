from rest_framework import serializers

from demands.models import Demand, DemandProduct


class DemandProductSerializer(serializers.ModelSerializer):
    """Demand Product serializer."""

    class Meta:
        model = DemandProduct
        fields = ('id', 'product', 'quantity')


class DemandSerializer(serializers.ModelSerializer):
    """Demand serializer."""
    products = DemandProductSerializer(many=True, read_only=False)

    class Meta:
        model = Demand
        fields = ('id', 'client', 'status', 'products', 'created_at', 'updated_at')

    def create(self, validated_data):
        products_data = validated_data.pop('products')
        demand = Demand.objects.create(**validated_data)
        for product in products_data:
            DemandProduct.objects.create(demand=demand, **product)
        return demand

    def update(self, instance, validated_data):
        products_data = validated_data.pop('products')
        super().update(instance, validated_data)
        product_list = []
        for product in products_data:
            if product.get('id') is None:
                product_list.append(DemandProduct.objects.create(demand=instance, **product).id)
            else:
                demand_product = DemandProduct.objects.get(id=product['id'])
                demand_product.product = product['product']
                demand_product.quantity = product['quantity']
                demand_product.save()
                product_list.append(demand_product.id)
        DemandProduct.objects.filter(demand=instance).exclude(id__in=product_list).delete()
        return instance
