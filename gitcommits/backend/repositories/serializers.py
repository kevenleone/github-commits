from rest_framework import serializers
from repositories.models import Repository
import requests

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = '__all__'

    def create(self, validated_data):
        github_api = 'https://api.github.com/repos/'
        user_repository = validated_data['name']
        data = requests.get(github_api + user_repository)

        if data.status_code == 200:
            user_repo = data.json()

            repository = Repository(
            description=user_repo["description"],
            stars=user_repo['stargazers_count'],
            user_id=validated_data['user_id'],
            forks=user_repo['forks_count'],
            language=user_repo['language'],
            name=validated_data['name'],
            id=user_repo["id"]
        )
            repository.save()
            return repository
        else:
            raise serializers.ValidationError({
                'repository': 'Repository not exists'
            })

