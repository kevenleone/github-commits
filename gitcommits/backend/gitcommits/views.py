import os
from decouple import Csv, config
from django.shortcuts import render
import requests

def index(request):
    return render(request, 'gitcommits/login.html')

def authMiddleware(request):
    code = request.GET.get("code")
    client_secret = config("GITHUB_CLIENT_SECRET")
    client_id = config('GITHUB_CLIENT_ID')
    base_url = 'https://github.com/login/oauth/access_token'
    complete_url = base_url + '?code=' + code + '&client_id=' + client_id + '&client_secret=' + client_secret
    token = requests.post(complete_url)
    return render(request, 'gitcommits/index.html')
