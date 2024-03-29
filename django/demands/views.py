from datetime import datetime
from django.http import HttpResponse
from django.template.loader import get_template

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from xhtml2pdf import pisa

from demands.serializers import DemandSerializer, DemandProductSerializer
from demands.models import Demand, DemandProduct
from demands.utils import link_callback


class DemandViewSet(viewsets.ModelViewSet):
    """ViewSet for Demand model."""
    queryset = Demand.objects.all()
    serializer_class = DemandSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['client', 'demand_date', 'status']

    @action(detail=False, methods=['get'], url_path='reports/pdf')
    def get_report(self, request):
        """Generate report and send file link to user."""
        if not request.user.is_superuser:
            return HttpResponse('You are not allowed to generate reports.')
        queryset = self.filter_queryset(self.get_queryset())
        template_path = 'report.html'
        total_products = {}
        for demand in queryset:
            demand_date = demand.demand_date.strftime('%d/%m/%Y')
            if total_products.get(demand_date) is None:
                total_products.update({demand_date: {}})
            for demand_product in demand.get_products():
                for date, row in total_products.items():
                    if date == demand_date:
                        if row.get(demand_product.product.name) is None:
                            total_products[date].update({demand_product.product.name: {'quantity': demand_product.quantity, 'price': demand_product.get_price()}})
                        else:
                            total_products[date][demand_product.product.name]['quantity'] += demand_product.quantity
                            total_products[date][demand_product.product.name]['price'] += demand_product.get_price()
        context = {'objects': queryset,
                   'total_products': total_products,
                   'now': datetime.now()}
        # Create a Django response object, and specify content_type as pdf
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{datetime.now().strftime("%Y%m%d-%H%M%S")}_report.pdf"'
        # find the template and render it.
        template = get_template(template_path)
        html = template.render(context)

        # create a pdf
        pisa_status = pisa.CreatePDF(
        html, dest=response, link_callback=link_callback)
        # if error then show some funny view
        if pisa_status.err:
            return HttpResponse('We had some errors <pre>' + html + '</pre>')
        return response

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
