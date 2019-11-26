from .models import Commit
from rest_framework import viewsets, permissions
from .serializers import CommitSerializer
from rest_framework.response import Response
from django.apps import apps
from pytz import timezone
import json
import sys

UserRepositoryModel = apps.get_model('repositories', 'UserRepository')

sys.path.append('..')
from gitwrapper.wrapper import get_last_month

class CommitViewSet(viewsets.ModelViewSet):
    queryset = Commit.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = CommitSerializer

    def list(self, request):
        last_month = get_last_month()
        last_month_utc = last_month.replace(tzinfo=timezone('UTC'))
        if request.session.get('github_user'):
            github_user = json.loads(request.session['github_user'])
            user = github_user['login']
            repositoriesIds = UserRepositoryModel.objects.filter(user_id=user).values_list('repo_id')
            _queryset = Commit.objects.filter(created_at__gte=last_month_utc, repo_id__in=repositoriesIds).order_by('-created_at')
        else:
            _queryset = self.queryset
        serializer = CommitSerializer(_queryset, many=True)
        return Response(serializer.data)
