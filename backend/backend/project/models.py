from django.db import models
from django_jsonform.models.fields import JSONField
from django.core.validators import FileExtensionValidator

class Project(models.Model):
    TECH_SCHEMA = {
        'type': 'array',
        'items': {
            'type': 'string' 
        }
    }

    title = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(blank=True, null=True)
    technologies = JSONField(schema=TECH_SCHEMA, default=list)
    video = models.FileField(upload_to='videos/', null=True, blank=True, validators=[FileExtensionValidator(allowed_extensions=[    "mp4", "avi", "mkv", "mov", "wmv", "flv", "webm", "mpeg", "mpg", "3gp",
    "ogv", "ts", "f4v", "m2ts", "divx"])])
    image = models.ImageField(upload_to='images/projects', null=True, blank=True)
    github = models.CharField(max_length=500, null=True, blank=True)
    demo = models.CharField(max_length=300, null=True, blank=True)
    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
    def delete(self, *args, **kwargs):
        if self.img:
            storage, path = self.image.storage, self.image.path
            if storage.exists(path):
                storage.delete(path)
        super().delete(*args, **kwargs)