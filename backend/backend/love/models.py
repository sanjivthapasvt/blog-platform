from django.db import models
from django.core.validators import FileExtensionValidator
# Create your models here.

class Love(models.Model):
    title = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    video = models.FileField(upload_to='videos/love/', null=True, blank=True, validators=[FileExtensionValidator(allowed_extensions=["mp4", "avi", "mkv", "mov", "wmv", "flv", "webm", "mpeg", "mpg", "3gp",
    "ogv", "ts", "f4v", "m2ts", "divx"])])
    image = models.ImageField(upload_to="images/love/", null=True, blank=True)

    def __str__(self):
        return self.title