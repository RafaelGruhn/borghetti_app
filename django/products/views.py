from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from products.models import Product, ProductType
from products.serializers import ProductSerializer, ProductTypeSerializer
from users.permissions import AllowViewUser


class ProductTypeViewSet(viewsets.ModelViewSet):
    """ViewSet for ProductType model."""
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer
    permission_classes = [IsAuthenticated, AllowViewUser]


class ProductViewSet(viewsets.ModelViewSet):
    """ViewSet for Product model."""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, AllowViewUser]
