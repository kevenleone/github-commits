from rest_framework import routers

from .api import RepositoryViewSet

router = routers.DefaultRouter()
router.register('api/repository', RepositoryViewSet, 'repositories')

urlpatterns = router.urls

