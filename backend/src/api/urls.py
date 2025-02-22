from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"events", views.EventViewSet, basename="events")

urlpatterns = router.urls
