from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .serializers import UserSerializer, CreateUserSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .utils.validate_token import validate_keycloak_token
from django.contrib.auth.models import User
from pymongo import MongoClient
import os


class CreateUserAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        username = request.data["username"]
        if username and User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            if user:
                return Response({
                    "user": UserSerializer(user, context=self.get_serializer_context()).data
                })

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data
        })

class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

client = MongoClient("mongodb://sscript:sscript2025@mongo:27017")
db = client["dashboard_db"]
activity_collection = db["user_activity_logs"]

class DashboardAPIView(generics.RetrieveAPIView):
    def get(self, request):
        logs = list(activity_collection.find({}, {"_id": 0, "user": 1, "action": 1, "timestamp": 1}))

        stats = db.dashboard_stats.find_one({}, {"_id": 0})
        return Response({
            "logs": logs,
            "stats": stats
        })