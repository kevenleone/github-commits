import json
import sys
import requests
from rest_framework import viewsets, permissions, serializers
from rest_framework.response import Response
from pytz import timezone
from .serializers import RepositorySerializer
from .models import Repository, UserRepository
from django.apps import apps

sys.path.append('..')
from gitwrapper.wrapper import save_commits_from_repo, get_last_month
from commits.serializers import CommitSerializer

CommitsModel = apps.get_model('commits', 'Commit')


class RepositoryViewSet(viewsets.ModelViewSet):
    queryset = Repository.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = RepositorySerializer

    def create(self, request):
        body = request.data
        user_repository = body['name']
        github_api = 'https://api.github.com/repos/'
        github_repo_url = github_api + user_repository
        user_id = body['user_id']
        data = requests.get(github_repo_url)
        repository_exists = False
        try:
            repository = Repository.objects.get(name=user_repository)
            repository_exists = True
        except Repository.DoesNotExist:
            if data.status_code == 200:
                user_repo = data.json()
                description = user_repo["description"] if user_repo["description"] else ''
                repository = Repository(
                    description=description,
                    star=user_repo['stargazers_count'],
                    fork=user_repo['forks_count'],
                    language=user_repo["language"] if user_repo["language"] else '',
                    name=user_repository,
                    id=user_repo["id"]
                )
                repository.save(user_repository)
                save_commits_from_repo(user_repository, repository)
            else:
                raise serializers.ValidationError({'message': 'Github: Repository not found'})
        obj, new_u_r = UserRepository.objects.update_or_create(user_id=user_id, repo=repository)
        repo_serialized = RepositorySerializer(repository).data
        if not repository_exists:
            return Response(repo_serialized)

        return Response(repo_serialized if new_u_r else {'message': 'Repository already exists'})

    def list(self, request):
        if request.session.get('github_user'):
            github_user = json.loads(request.session['github_user'])
            user = github_user['login']
            repo_ids = UserRepository.objects.filter(user_id=user).values_list('repo_id')
            repositories = Repository.objects.filter(id__in=repo_ids)
        else:
            repositories = self.queryset
        serializer = RepositorySerializer(repositories, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk):
        repo_name = pk.replace('*', '/')

        last_month = get_last_month()
        last_month_utc = last_month.replace(tzinfo=timezone('UTC'))

        try:
            repository = Repository.objects.get(name=repo_name)
            repositories_serialized = RepositorySerializer(repository).data
            repository_id = repositories_serialized['id']

            repo_ids = UserRepository.objects.filter(repo_id=repository_id).values_list('repo_id')
            _queryset = CommitsModel.objects.filter(
                created_at__gte=last_month_utc,
                repo_id__in=repo_ids).order_by('-created_at')

            commits_serialized = CommitSerializer(_queryset, many=True).data

            context = {
                'repository': repositories_serialized,
                'commits': commits_serialized
            }

            return Response(context)
        except Repository.DoesNotExist:
            raise serializers.ValidationError({'message': 'Repository not found'})
