from django.db import models
from cloudinary_storage.storage import VideoMediaCloudinaryStorage, MediaCloudinaryStorage
from cloudinary_storage.validators import validate_video


class Love(models.Model):
    title = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    video = models.FileField(upload_to='videos/love/', null=True, blank=True, storage=VideoMediaCloudinaryStorage(), validators=[validate_video])
    image = models.ImageField(upload_to="images/love/", null=True, blank=True, storage=MediaCloudinaryStorage())

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