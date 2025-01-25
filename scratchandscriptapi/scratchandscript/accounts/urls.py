from django.urls import path, include
from .api import CreateUserAPI, UserAPI, DashboardAPIView

urlpatterns = [
    path('api/auth/register', CreateUserAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/dashboard', DashboardAPIView.as_view())

]