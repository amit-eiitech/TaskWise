from django.db import models


# Create your models here.
class TaskGroup(models.Model):
    name = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=100)
    note = models.CharField(max_length=150, blank=True, null=True)
    isComplete = models.BooleanField(default=False, blank=True, null=True)
    isImportant = models.BooleanField(default=False, blank=True, null=True)
    taskGroup = models.ForeignKey(
        TaskGroup, on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.title
