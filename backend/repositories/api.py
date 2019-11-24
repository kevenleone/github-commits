from .models import Repository, UserRepository
from rest_framework import viewsets, permissions, serializers
from .serializers import RepositorySerializer, UserRepositorySerializer
from rest_framework.response import Response
import requests
import json

from django.apps import apps

Commit = apps.get_model('commits', 'Commit')

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

        if data.status_code == 200:
            user_repo = data.json()

            description = user_repo["description"] if user_repo["description"] else ''

            repository = Repository(
                description=description,
                star=user_repo['stargazers_count'],
                fork=user_repo['forks_count'],
                language=user_repo['language'],
                name=user_repository,
                id=user_repo["id"]
            )

            repository.save()

            user_m_repo = UserRepository(
                user_id=user_id,
                repo=repository
            ).save()

            repo_commits = requests.get(github_repo_url + '/commits?sha=master')

            for rc in repo_commits.json():
                author = rc['author']
                commit = rc['commit']

                repo = Commit(
                    sha=rc['sha'],
                    repository=user_repository,
                    author=commit['author']['name'],
                    author_mail=commit['author']['email'],
                    author_avatar=author['avatar_url'] if author else '',
                    message=commit['message'],
                    created_at=commit['author']['date']
                )
                repo.save()

            return Response(RepositorySerializer(repository).data)
        else:
            raise serializers.ValidationError({
                'message': 'Github: Repository not found'
            })

    def retrieve(self, request, pk):
        repositoriesIds = UserRepository.objects.filter(user_id=pk).values_list('repo_id')
        repositories = Repository.objects.filter(id__in=repositoriesIds)
        serializer = RepositorySerializer(repositories, many=True)
        return Response(serializer.data)
