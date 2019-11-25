from django.urls import path
from . import views

urlpatterns = [
    path('', views.WebHookViewSet.as_view({ 'post': 'receiveHook' }), name='receiveHook'),
]
