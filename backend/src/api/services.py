from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.exceptions import ValidationError

from api.models import Endereco, Event, Pessoa


class RegisterUserService:
    """Serviço para registrar um novo usuário."""

    @transaction.atomic
    def create(self, data: dict):
        if User.objects.filter(username=data["email"]).exists():
            raise ValidationError("Já existe um usuário cadastrado com esse email.")

        if data["password"] != data["password_confirmation"]:
            raise ValidationError("As senhas não conferem.")

        try:
            user = User.objects.create(
                username=data["email"],
                email=data["email"],
            )
            user.set_password(data["password"])
            user.save()
        except Exception as e:
            raise Exception(f"Erro ao criar usuário: {str(e)}")  # noqa: B904


class BaseService:
    def get_person(self, user: User):
        try:
            return Pessoa.objects.get(user=user)
        except Pessoa.DoesNotExist:
            raise Pessoa.DoesNotExist("O usuário não possui vinculo com uma pessoa.")  # noqa: B904


class EventService(BaseService):
    def delete(self, id: int):
        try:
            Event.objects.get(id=id).delete()
            return True
        except Event.DoesNotExist:
            raise Event.DoesNotExist("O evento não existe.")  # noqa: B904


class RegistrationService(BaseService):
    pass


class DependentesService(BaseService):
    def get_dependentes_from_user(self, user: User):
        return Pessoa.objects.dependentes_from_user(user)


class PersonService(BaseService):
    @transaction.atomic
    def create_person(self, user: User, validate_data: dict):
        try:
            endereco_data = validate_data.pop("endereco")
            dependentes_data = validate_data.pop("dependentes")

            endereco = Endereco.objects.create(**endereco_data)
            pessoa = Pessoa.objects.create(
                endereco=endereco,
                user=user,
                **validate_data,
            )

            if dependentes_data:
                for dependente_data in dependentes_data:
                    Pessoa.objects.create(
                        responsavel=pessoa,
                        endereco=endereco,
                        **dependente_data,
                    )
        except Exception as e:
            raise Exception(str(e))  # noqa: B904

    def update_person(self, person_id: int, validated_date: dict):
        pass
