import requests
from django.apps import apps
from datetime import datetime, date
from dateutil import relativedelta, parser

github_api = 'https://api.github.com'
github_repos_url = github_api + '/repos/'
webhook = 'http://localhost:8000/api/webhook'
date_format = '%Y-%m-%d'

Commit = apps.get_model('commits', 'Commit')

def verify_date_between(date1, date2):
    print(date1, date2, date1 >= date2)
    return date1 >= date2

def subtract_date_months(date, months):
    d = datetime.strptime(date, '%Y-%m-%d')
    return d - relativedelta.relativedelta(months=months)

def get_last_month():
    today = date.today().strftime('%Y-%m-%d')
    return subtract_date_months(today, 1)

def save_commits_from_repo(repository):
    user_repo = github_repos_url + repository
    repo_commits = requests.get(user_repo + '/commits?sha=master')

    last_month = get_last_month()
    insert_count = 0

    for rc in repo_commits.json():
        author = rc['author']
        commit = rc['commit']
        created_at = commit['author']['date']

        is_after = verify_date_between(parser.parse(created_at).replace(tzinfo=None), last_month)

        if is_after:
            repo = Commit(
                sha=rc['sha'],
                repository=repository,
                author=commit['author']['name'],
                author_mail=commit['author']['email'],
                author_avatar=author['avatar_url'] if author else '',
                message=commit['message'],
                created_at=created_at
            )
            repo.save()
            insert_count += 1

    print("End of process repo: {0}, total of commits: {1} total inserted: {2}".format(repository, len(repo_commits.json()), insert_count))



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


