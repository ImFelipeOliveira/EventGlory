from rest_framework import serializers  # type: ignore

from .models import Endereco, Event, Pessoa


class RegisterUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    password_confirmation = serializers.CharField()


class TokenSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    refresh_token = serializers.CharField()
    expires_in = serializers.IntegerField()


class EmptySerializer(serializers.Serializer):
    pass


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
    dependentes = DependenteSerializer(many=True, required=False)
    endereco = EnderecoSerializer()

    class Meta:
        model = Pessoa
        fields = [
            "name",
            "cpf",
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
            "description",
            "start_date",
            "end_date",
            "min_age",
            "price",
            "max_participants",
            "city",
            "state",
            "registration_deadline",
            "categories",
            "requires_payment",
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
