from rest_framework import viewsets
from rest_framework.response import Response
from .wrapper import process_github_hook


class WebHookViewSet(viewsets.ViewSet):
    def receiveHook(self, request):
        data = {'message': 'Data Received'}
        try:
            repository_hook = request.data["repository"]
            process_github_hook.delay(repository_hook)
        except KeyError:
            print("Error while process Hook")
        return Response(data)
