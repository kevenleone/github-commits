from rest_framework import serializers
from .models import Commit
import requests

class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = '__all__'
