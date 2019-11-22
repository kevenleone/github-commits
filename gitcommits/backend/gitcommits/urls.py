from . import views
from django.urls import path
from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView
import django_js_reverse.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),

    url(r'^login/$', views.login, name='login'),
    url(r'^$', views.index, name='home'),
    url(r'^authmiddleware/$', views.authMiddleware, name='oauth'),
    path('', include('repositories.urls'))

]
