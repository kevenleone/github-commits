from rest_framework import routers

from .api import CommitViewSet

router = routers.DefaultRouter()
router.register('api/commits', CommitViewSet, 'commits')

urlpatterns = router.urls
