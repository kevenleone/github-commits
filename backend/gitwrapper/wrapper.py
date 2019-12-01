from datetime import datetime, date
import json
import requests
from django.apps import apps
import dateutil.relativedelta
import dateutil.parser
from decouple import config
from .pusher import send_pusher

webhook_payload = config('WEBHOOK_PAYLOAD')
github_repos_url = 'https://api.github.com/repos/'

Commit = apps.get_model('commits', 'Commit')
Repository = apps.get_model('repositories', 'Repository')

body_context = {
    "name": "web",
    "events": [
        "push",
    ],
    "config": {
        "url": webhook_payload,
        "content_type": "json",
        "insecure_ssl": "0"
    }
}


def verify_date_between(date1, date2):
    return date1 >= date2


def subtract_date_months(_date, months):
    d = datetime.strptime(_date, '%Y-%m-%d')
    return d - dateutil.relativedelta.relativedelta(months=months)


def get_last_month():
    today = date.today().strftime('%Y-%m-%d')
    return subtract_date_months(today, 1)


def save_commits_from_repo(repository, repo_object):
    user_repo = github_repos_url + repository
    repo_commits = requests.get(user_repo + '/commits?sha=master')

    last_month = get_last_month()
    insert_count = 0
    update_count = 0

    for rc in repo_commits.json():
        author = rc['author']
        commit = rc['commit']
        created_at = commit['author']['date']

        is_after = verify_date_between(
            dateutil.parser.parse(created_at).replace(tzinfo=None),
            last_month
        )

        if is_after:
            _, is_new = Commit.objects.update_or_create(
                sha=rc['sha'],
                repo=repo_object,
                repository=repository,
                author=commit['author']['name'],
                author_mail=commit['author']['email'],
                author_avatar=author['avatar_url'] if author else '',
                message=commit['message'],
                created_at=created_at
            )
            if is_new:
                insert_count += 1
                print("Commit created")
            else:
                update_count += 1
                print('Commit updated')

    print("""
        End of process repo: {0},
        total of commits: {1},
        total inserted: {2},
        total updated: {3}
    """.format(repository, len(repo_commits.json()), insert_count, update_count))


def process_github_hook(hook_repository):
    repository_id = hook_repository['id']
    repository = hook_repository['full_name']
    try:
        repo = Repository.objects.get(id=repository_id)
        repo.star = hook_repository['stargazers_count']
        repo.fork = hook_repository['forks_count']
        repo.save()

        save_commits_from_repo(repository, repo)
        send_pusher('github', 'refresh-commit', 'data received')
        print("GitHub Hook update {0} and commits !!!".format(repository))
    except Repository.DoesNotExist:
        print("Repo not exists")


def assign_hook(token, user_repository, repository):
    hooks_url = github_repos_url + user_repository + '/hooks'
    headers = {
        'Authorization': 'token ' + token,
        'Content-Type': 'application/json'
    }

    ctx = json.dumps(body_context)
    response = requests.post(hooks_url, data=ctx, headers=headers)
    if response.status_code == 201:
        data = response.json()
        repository.hook_id = data["id"]
        repository.save()
