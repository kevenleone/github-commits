from . import views
from django.urls import path
from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView
import django_js_reverse.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),

    url(r'^login/$', views.index, name='login'),
    url(r'^authmiddleware/$', views.authMiddleware, name='oauth'),
    url(r'^$', TemplateView.as_view(template_name='gitcommits/index.html'), name='home'),
    path('', include('repositories.urls'))

]
