from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from demands.serializers import DemandSerializer, DemandProductSerializer
from demands.models import Demand, DemandProduct

class DemandViewSet(viewsets.ModelViewSet):
    """ViewSet for Demand model."""
    queryset = Demand.objects.all()
    serializer_class = DemandSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return self.queryset
        return self.queryset.filter(client=self.request.user)


class DemandProductViewSet(viewsets.ModelViewSet):
    """ViewSet for Demand model."""
    queryset = DemandProduct.objects.all()
    serializer_class = DemandProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return self.queryset
        return self.queryset.filter(demand__client=self.request.user)
