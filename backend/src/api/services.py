from django.contrib.auth.models import User
from django.db import transaction

from api.models import Endereco, Pessoa


class BaseService:
    pass


class RegistrationService(BaseService):
    pass


class DependentesService(BaseService):
    def get_dependentes_from_user(self, user: User):
        dependentes = Pessoa.objects.filter(responsavel__user=user)
        return dependentes


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
