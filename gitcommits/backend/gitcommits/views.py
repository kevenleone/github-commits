from django.shortcuts import render
from github import Github

# g = Github("kevenleone", "Ke36622637")
# for repo in g.get_user().get_repos():
#     print(repo.name)

def index(request):
    return render(request, 'gitcommits/login.html')

def login(request):
    user = request.POST['user']
    password = request.POST['password']
    try:
        g = Github(user, password).get_user()
        # g = Github(user, password).get_user()
        return render(request, 'gitcommits/itworks.html', { user: g.name })
    except Exception as e:
        return render(request, 'gitcommits/login.html', {
            'user': user,
            'password': password,
            'error_message': 'You inserted wrong credentials, try again.'
        })

