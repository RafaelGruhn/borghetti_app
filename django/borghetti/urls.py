"""borghetti URL Configuration."""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path



urlpatterns = [
    path('admin/', admin.site.urls),
    path('sentiment-analysis/', include('sentiment_analysis.urls')),
]

if settings.DEBUG:
    # Getting media files for debug environment.
    urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + urlpatterns
