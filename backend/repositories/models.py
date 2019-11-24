from django.db import models

class Repository(models.Model):
    name = models.CharField(max_length=80, unique=True)
    description = models.CharField(max_length=5000, blank=True)
    star = models.IntegerField(default=0)
    fork = models.IntegerField(default=0)
    language = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class UserRepository(models.Model):
    user_id = models.CharField(max_length=50)
    repo = models.ForeignKey(Repository, on_delete=models.CASCADE, blank=True)
