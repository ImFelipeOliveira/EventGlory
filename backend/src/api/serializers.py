from rest_framework import serializers  # type: ignore

from .models import Endereco, Event, Pessoa


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(default="Message")


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
            "id",
            "name",
            "image",
            "start_date",
            "end_date",
            "description",
            "price",
            "created_by",
            "updated_by",
        ]
        read_only_fields = ["created_by", "updated_by"]

    def create(self, validated_data):
        user = validated_data.get("user")
        event = Event(**validated_data)
        event.created_by = user
        event.updated_by = user
        event.save()
        return event


class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = "__all__"
