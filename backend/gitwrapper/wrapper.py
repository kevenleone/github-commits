from datetime import datetime, date
import json
import requests
from django.apps import apps
from decouple import config
import dateutil.relativedelta
import dateutil.parser
from celery import Celery
from .pusher import send_pusher


app = Celery(
    'gitcommits_tasks',
    backend=config('REDIS_URL'),
    broker=config('REDIS_URL')
)

webhook_payload = config('WEBHOOK_PAYLOAD')
github_repos_url = 'https://api.github.com/repos/'

Commit = apps.get_model('commits', 'Commit')
Repository = apps.get_model('repositories', 'Repository')
UserRepository = apps.get_model('repositories', 'UserRepository')

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


def notify_users_commit(repository_id):
    users_repository = UserRepository.objects.filter(repo_id=repository_id)
    for user in users_repository:
        user_id = "user." + user.user_id
        send_pusher(user_id, 'refresh-commit', 'data received')
        send_pusher(user_id, 'refresh-all', 'data received')
    print("Notify Users Commit - End of Process")


def verify_date_between(date1, date2):
    return date1 >= date2


def subtract_date_months(_date, months):
    d = datetime.strptime(_date, '%Y-%m-%d')
    return d - dateutil.relativedelta.relativedelta(months=months)


def get_last_month():
    today = date.today().strftime('%Y-%m-%d')
    return subtract_date_months(today, 1)


def save_commits_from_repo(repo_object):
    repository = repo_object.name
    user_repo = github_repos_url + repository
    repo_commits = requests.get(user_repo + '/commits?sha=master')

    last_month = get_last_month()
    insert_count = 0
    update_count = 0

    for rc in repo_commits.json():
        author = rc['author']
        commit = rc['commit']
        created_at = commit['author']['date']

        created_at_dt = dateutil.parser.parse(created_at).replace(tzinfo=None)
        is_after = verify_date_between(created_at_dt, last_month)

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
            else:
                update_count += 1

    print("""End of process repo: {0}, Total of: commits: {1}, created: {2}, updated: {3}
    """.format(repository, len(repo_commits.json()), insert_count, update_count))


@app.task
def process_github_hook(hook_repository):
    func = 'GitHub Payload -'
    print("{0} Starting to Process".format(func))
    repository_id = hook_repository['id']
    try:
        repo = Repository.objects.get(id=repository_id)
        repository = hook_repository['full_name']
        repo.star = hook_repository['stargazers_count']
        repo.fork = hook_repository['forks_count']
        repo.save()

        save_commits_from_repo(repo)
        notify_users_commit(repository_id)
        print("{0} update {1} and commits !!!".format(func, repository))
    except Repository.DoesNotExist:
        print("{0} Repository not exists".format(func))
    finally:
        print("{0} End of Process".format(func))


@app.task
def assign_hook(token, repository_name):
    func = 'Assign Hook -'
    print("{0} Starting to Process".format(func))
    hooks_url = github_repos_url + repository_name + '/hooks'
    headers = {
        'Authorization': 'token ' + token,
        'Content-Type': 'application/json'
    }

    try:
        repository = Repository.objects.get(name=repository_name)
        ctx = json.dumps(body_context)
        response = requests.post(hooks_url, data=ctx, headers=headers)
        if response.status_code == 201:
            data = response.json()
            repository.hook_id = data["id"]
            repository.save()
            channel = "user." + repository_name.split('/')[0]
            send_pusher(channel, 'refresh-repository', 'Hook Assigned')
            print("{0} {1} Hook created and repo has been updated".format(func, repository_name))
        else:
            reason = response.text
            print("{0} {1} Hook not created, reason: {2}".format(func, repository_name, reason))
    except Repository.DoesNotExist:
        print("{0} Repository: {1} not exists".format(func, repository_name))
    finally:
        print("{0} End of Process".format(func))
