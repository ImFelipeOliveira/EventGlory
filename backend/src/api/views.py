from rest_framework import status, viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.serializers import EventSerializer, PessoaSerializer

from .models import Event, Pessoa
from .services import DependentesService


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
        serializer = PessoaSerializer(queryset, many=True)
        return Response(serializer.data)
