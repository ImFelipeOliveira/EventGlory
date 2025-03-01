from django.contrib.auth.models import User
from django.db import transaction

from api.models import Endereco, Pessoa


class BaseService:
    def get_person(self, user: User):
        try:
            return Pessoa.objects.get(user=user)
        except Pessoa.DoesNotExist:
            raise Pessoa.DoesNotExist("O usuário não possui vinculo com uma pessoa.")  # noqa: B904


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
