from rest_framework import serializers  # type: ignore

from .models import Event


class EventSerializer(serializers.Serializer):
    name = serializers.CharField()
    image = serializers.ImageField()
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    description = serializers.CharField()
    price = serializers.DecimalField(decimal_places=2, max_digits=6)

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
