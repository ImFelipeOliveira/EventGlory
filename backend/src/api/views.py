from rest_framework import viewsets
from rest_framework.response import Response

from api.serializers import EventSerializer
from api.services import EventGlory

from .models import Event


class EventViewSet(viewsets.ViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    def list(self, request):
        queryset = Event.objects.all()
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = EventSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=400,
            )
        response = EventGlory().create_event(
            user=request.user,
            serializer=serializer,
        )
        if response:
            return Response(response)
