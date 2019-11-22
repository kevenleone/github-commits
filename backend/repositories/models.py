from django.db import models

class Repository(models.Model):
    name = models.CharField(max_length=80, unique=True)
    user_id = models.CharField(max_length=50)
    description = models.CharField(max_length=5000, blank=True)
    stars = models.IntegerField(default=0)
    forks = models.IntegerField(default=0)
    language = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
