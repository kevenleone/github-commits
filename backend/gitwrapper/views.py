from django.shortcuts import render
from rest_framework import viewsets

from django.http import JsonResponse
from rest_framework.response import Response

from .pusher import send_pusher

class WebHookViewSet(viewsets.ViewSet):
    def receiveHook(self, request):
        print(request.data)
        data = {
            'message': 'Data Received'
        }
        send_pusher('github', 'refresh-commit', 'data received')
        return Response(data)
