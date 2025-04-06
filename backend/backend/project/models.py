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
    subtitle = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    technologies = JSONField(schema=TECH_SCHEMA, default=list)
    video = models.FileField(upload_to='videos/love/', null=True, blank=True,validators=[FileExtensionValidator([
        '.mp4','.mkv','.avi','.mov','.flv','.wmv','.webm','.mpeg','.mpg','.3gp','.ogv','.rm','.vob','.ts','.m4v','.mts'
])])
    image = models.ImageField(upload_to='images/projects/', null=True, blank=True)
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

        if self.video:
            storage, path = self.video.storage, self.video.path
            if storage.exists(path):
                storage.delete(path)
        super().delete(*args, **kwargs)