from rest_framework import serializers

from products.models import Product, ProductType


class ProductTypeSerializer(serializers.ModelSerializer):
    """Product serializer."""

    class Meta:
        model = ProductType
        fields = '__all__'



class ProductSerializer(serializers.ModelSerializer):
    """Product serializer."""

    class Meta:
        model = Product
        fields = '__all__'
