from django.db import models
from django.core.validators import FileExtensionValidator
# Create your models here.

class Love(models.Model):
    title = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    video = models.FileField(upload_to='videos/love/', null=True, blank=True, validators=[FileExtensionValidator(allowed_extensions=["mp4", "avi", "mkv", "mov", "wmv", "flv", "webm", "mpeg", "mpg", "3gp",
    "ogv", "ts", "f4v", "m2ts", "divx"])])
    image = models.ImageField(upload_to="images/love/", null=True, blank=True)

    def delete(self, *args, **kwargs):
        if self.image:
            storage, path = self.image.storage, self.image.path
            if storage.exists(path):
                storage.delete(path)
                
        if self.video:
            storage, path = self.video.storage, self.video.path
            if storage.exists(path):
                storage.delete(path)
    
        super().delete(*args, **kwargs)
        
    def __str__(self):
        return self.title