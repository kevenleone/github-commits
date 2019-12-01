from rest_framework import viewsets
from rest_framework.response import Response
from .wrapper import process_github_hook


class WebHookViewSet(viewsets.ViewSet):
    def receiveHook(self, request):
        data = {
            'message': 'Data Received'
        }
        repository_hook = request.data["repository"]
        process_github_hook(repository_hook)
        return Response(data)
