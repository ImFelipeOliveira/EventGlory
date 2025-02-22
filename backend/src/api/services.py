from django.contrib.auth.models import User
from rest_framework.serializers import Serializer

from .models import Event


class EventGlory:
    def create_event(self, user: User, serializer: Serializer):
        try:
            event = Event.objects.create(
                user=user,
                name=serializer.validated_data["name"],
                image=serializer.validated_data["image"],
                start_date=serializer.validated_data["start_date"],
                end_date=serializer.validated_data["end_date"],
                description=serializer.validated_data["description"],
                price=serializer.validated_data["price"],
            )
        except Exception as e:
            raise Exception(f"Ocorreu algum erro ao tentar criar o evento. Erro:  {e}")  # noqa: B904

        if event:
            return True
