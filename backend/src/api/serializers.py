from rest_framework import serializers

from .models import Event


class EventSerializer(serializers.Serializer):
    class Meta:
        Model = Event
        fields = [
            "name",
            "image",
            "start_date",
            "end_date",
            "description",
            "price",
        ]
