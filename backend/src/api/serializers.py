from rest_framework import serializers  # type: ignore

from .models import Event, Pessoa, Registration


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


class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = "__all__"
