import os
from decouple import config
from django.shortcuts import render
from django.http import HttpResponseRedirect
import requests
import json

def index(request):
    if request.session.get('github_user'):
        pusher_key = config('PUSHER_APP_KEY')
        user = json.dumps(request.session['github_user'])
        context = { 'user' : user, 'pusher_key' : pusher_key }
        return render(request, 'gitcommits/index.html', context )
    else:
        return HttpResponseRedirect('/login')

def login(request):
    if not request.session.get('github_user'):
        client_id = config('GITHUB_CLIENT_ID')
        return render(request, 'gitcommits/login.html', { 'client_id' : client_id })
    else:
        return HttpResponseRedirect('/')

def logout(request):
    try:
        del request.session['github_user']
    except KeyError:
        print("Session not exists, redirecting...")
    finally:
        return HttpResponseRedirect('/login')

def authMiddleware(request):
    code = request.GET.get("code")

    if code:
        client_secret = config("GITHUB_CLIENT_SECRET")
        client_id = config('GITHUB_CLIENT_ID')
        base_url = 'https://github.com/login/oauth/access_token'
        complete_url = base_url + '?code=' + code + '&client_id=' + client_id + '&client_secret=' + client_secret
        response = requests.post(complete_url)
        response_message = response.text
        if (response_message.find('access_token=') > -1):
            token = response_message.split('=')[1].split('&')[0]
            request.session['github_token'] = token
            user_request = requests.get(
                'https://api.github.com/user',
                headers={ 'Authorization' : 'token ' + token }
            )
            if (user_request.status_code == 200):
                request.session['github_user'] = user_request.text
                return HttpResponseRedirect('/')
            else:
                return HttpResponseRedirect('/login?error_message=error_on_get_user')
        else:
            return HttpResponseRedirect('/login?error_message=invalid_token')
    else:
        return HttpResponseRedirect('/login?error_message=code_not_found')
