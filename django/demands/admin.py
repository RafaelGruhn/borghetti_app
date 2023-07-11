from django.contrib import admin

from demands.models import Demand, DemandProduct

admin.site.register(Demand)
admin.site.register(DemandProduct)