"""Routers for Trinovati API."""
from rest_framework.routers import DefaultRouter
from django.urls import path

from users.views import UserTokenObtainPairView
from products.views import ProductTypeViewSet, ProductViewSet


router = DefaultRouter()
# example
router.register('product-types', ProductTypeViewSet, basename='product-type')
router.register('products', ProductViewSet, basename='product')


routers = [
    path('token/', UserTokenObtainPairView.as_view(), name='token_obtain_pair'),
]

routers += router.urls
