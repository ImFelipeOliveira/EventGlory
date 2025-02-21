from django.urls import include, path
from rest_framework import routers, urls

router = routers.DefaultRouter()

urlpatterns = [
    path("", include(urls)),
]
