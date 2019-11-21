from repositories.models import Repository
from rest_framework import viewsets, permissions
from .serializers import RepositorySerializer

class RepositoryViewSet(viewsets.ModelViewSet):
    queryset = Repository.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = RepositorySerializer
