from django.db import models
from sys import path

path.append('..')

from repositories.models import Repository

class Commit(models.Model):
    sha = models.CharField(unique=True, max_length=50)
    repo = models.ForeignKey(Repository, on_delete=models.CASCADE, blank=True, default=None)
    repository = models.CharField(max_length=50, blank=True)
    author = models.CharField(max_length=50)
    author_mail = models.EmailField(max_length=254)
    author_avatar = models.CharField(max_length=5000, blank=True)
    message = models.CharField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=False)
