import requests

github_api = 'https://api.github.com'
webhook = 'http://localhost:8000/api/webhook'

def assign_hook(token, repository):
    hooks_url = github_api + '/repos/' + repository + '/hooks'
    headers = {'Authorization' : 'token ' + token}
    context = {
        "name": "web",
        "active": True,
        "events": [
            "push",
        ],
        "config": {
            "url": webhook,
            "content_type": "json",
            "insecure_ssl": "0"
        }
    }
    response = requests.post(hooks_url, data=context, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data.id
    else:
        return ""


