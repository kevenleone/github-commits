import json
import sys
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from pytz import timezone
from .models import Commit
from .serializers import CommitSerializer
from django.apps import apps
from django.core.paginator import Paginator

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
        try:
            num_page = request.GET.get('page') or 1
            num_page = int(num_page)
        except ValueError:
            num_page = 1
        last_month = get_last_month()
        last_month_utc = last_month.replace(tzinfo=timezone('UTC'))
        if request.session.get('github_user'):
            github_user = json.loads(request.session['github_user'])
            user = github_user['login']
            repositories_ids = UserRepositoryModel.objects.filter(
                user_id=user
            ).values_list('repo_id')

            _queryset = Commit.objects.filter(
                created_at__gte=last_month_utc,
                repo_id__in=repositories_ids
            ).order_by('-created_at')
        else:
            _queryset = self.queryset
        serializer = CommitSerializer(_queryset, many=True)
        paginator = Paginator(serializer.data, 25)
        page = paginator.page(num_page)
        send_content = {'page': num_page, 'data': page.object_list, 'has_next': page.has_next()}
        return Response(send_content)
