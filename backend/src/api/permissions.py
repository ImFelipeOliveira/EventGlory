from rest_framework.permissions import BasePermission

from .models import Pessoa


class UserIsNotPerson(BasePermission):
    def has_permission(self, request, view):
        return not Pessoa.objects.filter(user=request.user, responsavel__isnull=True).exists()
