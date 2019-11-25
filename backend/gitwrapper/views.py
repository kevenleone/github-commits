from django.shortcuts import render
from rest_framework import viewsets

from django.http import JsonResponse
from rest_framework.response import Response

class WebHookViewSet(viewsets.ViewSet):
    def receiveHook(self, request):
        print(request.data)
        data = {
            'message': 'Data Received'
        }
        return Response(data)
