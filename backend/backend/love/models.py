from django.db import models
from django.core.validators import FileExtensionValidator

class Love(models.Model):
    title = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    video = models.FileField(upload_to='videos/love/', null=True, blank=True,validators=[FileExtensionValidator([
        '.mp4','.mkv','.avi','.mov','.flv','.wmv','.webm','.mpeg','.mpg','.3gp','.ogv','.rm','.vob','.ts','.m4v','.mts'
])])
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