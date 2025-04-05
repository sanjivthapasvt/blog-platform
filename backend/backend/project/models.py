from django.db import models
from django_jsonform.models.fields import JSONField
from cloudinary_storage.storage import VideoMediaCloudinaryStorage, MediaCloudinaryStorage
from cloudinary_storage.validators import validate_video

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
    video = models.FileField(upload_to='videos/', blank=True, null=True, storage=VideoMediaCloudinaryStorage(), validators=[validate_video])
    image = models.ImageField(upload_to='images/projects/', null=True, blank=True, storage=MediaCloudinaryStorage())
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