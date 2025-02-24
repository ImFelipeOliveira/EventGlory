from rest_framework import status, viewsets
from rest_framework.response import Response

from api.serializers import EventSerializer
from api.services import EventGlory

from .models import Event


class EventViewSet(viewsets.ViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()

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
                status=status.HTTP_400_BAD_REQUESTs,
            )
        response = EventGlory().create_event(
            user=request.user,
            serializer=serializer,
        )
        if response:
            return Response(response)
