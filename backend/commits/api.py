from commits.models import Commit
from rest_framework import viewsets, permissions
from .serializers import CommitSerializer

class CommitViewSet(viewsets.ModelViewSet):
    queryset = Commit.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = CommitSerializer
