from django.contrib.auth.models import User

from api.models import Pessoa


class BaseService:
    pass


class RegistrationService(BaseService):
    pass


class DependentesService(BaseService):
    def get_dependentes_from_user(self, user: User):
        dependentes = Pessoa.objects.filter(responsavel__user=user)
        return dependentes
