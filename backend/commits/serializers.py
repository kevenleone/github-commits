from rest_framework import serializers
from commits.models import Commit
import requests

class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = '__all__'
