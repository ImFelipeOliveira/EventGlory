from rest_framework import serializers  # type: ignore

from .models import Endereco, Event, Pessoa


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = "__all__"


class DependenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = ["name", "date_of_birth", "sexo"]


class CreatePersonSerializer(serializers.ModelSerializer):
    dependentes = DependenteSerializer(many=True)
    endereco = EnderecoSerializer()

    class Meta:
        model = Pessoa
        fields = [
            "name",
            "date_of_birth",
            "sexo",
            "dependentes",
            "endereco",
        ]


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
