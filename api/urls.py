from django.urls import path
from . import views


urlpatterns = [
    path("groups/", views.ViewGroups, name="ViewGroups"),
    path("create-group/", views.CreateGroup, name="CreateGroup"),
    path("update-group/<str:pk>/", views.UpdateGroup, name="UpdateGroup"),
    path("delete-group/<str:pk>/", views.DeleteGroup, name="DeleteGroup"),
    path("tasks/", views.ViewTasks, name="ViewTasks"),
    path("task/<str:pk>/", views.ViewTask, name="ViewTask"),
    path("create-task/", views.CreateTask, name="CreateTask"),
    path("update-task/<str:pk>/", views.UpdateTask, name="UpdateTask"),
    path("delete-task/<str:pk>/", views.DeleteTask, name="DeleteTask"),
]
