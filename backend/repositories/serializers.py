from rest_framework import serializers
from .models import Repository, UserRepository


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = '__all__'


class UserRepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRepository
        fields = '__all__'
