from .models import Repository, UserRepository
from rest_framework import viewsets, permissions, serializers
from .serializers import RepositorySerializer, UserRepositorySerializer
from rest_framework.response import Response
import requests
import json
import sys

sys.path.append('..')
from gitwrapper.wrapper import save_commits_from_repo

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
                language = user_repo["language"] if user_repo["language"] else ''
                repository = Repository(
                    description=description,
                    star=user_repo['stargazers_count'],
                    fork=user_repo['forks_count'],
                    language=language,
                    name=user_repository,
                    id=user_repo["id"]
                )
                repository.save(user_repository)
                save_commits_from_repo(user_repository, repository)
            else:
                raise serializers.ValidationError({'message': 'Github: Repository not found'})
        obj, new_u_r = UserRepository.objects.update_or_create(user_id=user_id, repo=repository)
        repository_serialized = RepositorySerializer(repository).data
        if not repository_exists:
            return Response(repository_serialized)
        else: return Response( repository_serialized if new_u_r else { 'message' : 'Repository already exists'})

    def retrieve(self, request, pk):
        repositoriesIds = UserRepository.objects.filter(user_id=pk).values_list('repo_id')
        repositories = Repository.objects.filter(id__in=repositoriesIds)
        serializer = RepositorySerializer(repositories, many=True)
        return Response(serializer.data)
