from drf_spectacular.utils import extend_schema
from rest_framework import status, viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.permissions import UserIsNotPerson
from api.serializers import CreatePersonSerializer, EventSerializer, PessoaSerializer

from .models import Event, Pessoa
from .services import DependentesService, PersonService


class PersonViewSet(viewsets.ViewSet):
    serializer_class = CreatePersonSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        pessoa = PersonService().get_person(user=request.user)
        serializer = self.serializer_class(pessoa)
        return Response(serializer.data)


class CreatePersonViewSet(viewsets.ViewSet):
    serializer_class = CreatePersonSerializer
    permission_classes = [IsAuthenticated, UserIsNotPerson]

    @extend_schema(responses={201: "msg"})
    def create(self, request):
        """Endpoint de criação e vinculação do usuário padrão do django com a entidade Pessoa."""
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
        PersonService().create_person(
            user=request.user,
            validate_data=serializer.validated_data,
        )
        return Response(
            "Usuário criado com sucesso.",
            status=status.HTTP_201_CREATED,
        )


class EventViewSet(viewsets.ViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        serializer = self.serializer_class(
            self.queryset,
            many=True,
        )
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer.save(user=request.user)
        return Response(
            "Evento criado com sucesso.",
            status=status.HTTP_201_CREATED,
        )


class DependentsListViewSet(viewsets.ViewSet):
    serializer_class = PessoaSerializer
    queryset = Pessoa.objects.none()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = DependentesService().get_dependentes_from_user(user=self.request.user)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
