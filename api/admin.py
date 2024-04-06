from django.contrib import admin
from .models import Task, TaskGroup

# Register your models here.
admin.site.register(Task)
admin.site.register(TaskGroup)
