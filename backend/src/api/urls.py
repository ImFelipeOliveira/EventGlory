from django.conf.urls.static import static
from rest_framework import routers

from eventglory import settings

from . import views

router = routers.DefaultRouter()
router.register(r"events", views.EventViewSet, basename="events")
router.register(r"dependents", views.DependentsListViewSet, basename="dependents")

urlpatterns = router.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
