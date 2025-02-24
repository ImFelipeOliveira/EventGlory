from rest_framework import serializers  # type: ignore

from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "name",
            "image",
            "start_date",
            "end_date",
            "description",
            "price",
        ]
