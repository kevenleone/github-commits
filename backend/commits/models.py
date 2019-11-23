from django.db import models

class Commit(models.Model):
    sha = models.CharField(unique=True, max_length=50)
    author = models.CharField(max_length=50)
    author_mail = models.EmailField(max_length=254)
    author_avatar = models.CharField(max_length=50, blank=True)
    message = models.CharField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)
