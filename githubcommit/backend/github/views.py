from django.shortcuts import render
from github import Github

def index(request):
  return render(request, 'githubapp/login.html')