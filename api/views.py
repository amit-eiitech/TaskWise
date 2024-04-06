from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task, TaskGroup
from .serializers import TaskSerializer, TaskGroupSerializer

from django.views.generic import TemplateView


# Create your views here.
# VIEW GROUPS
@api_view(["GET"])
def ViewGroups(request):
    groups = TaskGroup.objects.all().order_by("-id")
    serializer = TaskGroupSerializer(groups, many=True)
    return Response(serializer.data)


# CREATE GROUP
@api_view(["POST"])
def CreateGroup(request):
    name = request.data.get("name")
    existing_group = TaskGroup.objects.filter(name=name)

    if existing_group.exists():
        suffix = 1
        while True:
            new_name = f"{name} ({suffix})"
            if not TaskGroup.objects.filter(name=new_name).exists():
                break
            suffix += 1
        name = new_name

    serializer = TaskGroupSerializer(data={"name": name})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    else:
        return Response(serializer.errors, status=400)


# VIEW ALL TASKS
@api_view(["GET"])
def ViewTasks(request):
    tasks = Task.objects.all().order_by("-id")
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# VIEW SINGLE TASK
@api_view(["GET"])
def ViewTask(request, pk):
    tasks = Task.objects.all().filter(task_id=pk).order_by("-id")
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# CREATE TASK
@api_view(["POST"])
def CreateTask(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# UPDATE TASK
@api_view(["POST"])
def UpdateTask(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# UPDATE GROUP
@api_view(["POST"])
def UpdateGroup(request, pk):
    group = TaskGroup.objects.get(id=pk)
    serializer = TaskGroupSerializer(instance=group, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# DELETE TASK
@api_view(["DELETE"])
def DeleteTask(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response("Task deleted successfully!")


# DELETE GROUP
@api_view(["DELETE"])
def DeleteGroup(request, pk):
    group = TaskGroup.objects.get(id=pk)
    group.delete()
    return Response("Group deleted successfully!")
