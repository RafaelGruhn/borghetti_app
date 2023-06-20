from rest_framework import serializers

from demands.models import Demand, DemandProduct


class DemandProductSerializer(serializers.ModelSerializer):
    """Demand Product serializer."""

    class Meta:
        model = DemandProduct
        fields = ('id', 'product', 'quantity')


class DemandSerializer(serializers.ModelSerializer):
    """Demand serializer."""
    products = DemandProductSerializer(many=True, read_only=False, source='get_products')

    class Meta:
        model = Demand
        fields = ('id', 'client', 'status', 'products', 'created_at', 'updated_at')

    def create(self, validated_data):
        products_data = validated_data.pop('products')
        demand = Demand.objects.create(**validated_data)
        for product in products_data:
            DemandProduct.objects.create(demand=demand, **product)
        return demand
