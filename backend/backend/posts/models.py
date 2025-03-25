from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.
User = get_user_model()
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=250, blank=True)
    description = models.TextField(max_length=5000)
    img = models.ImageField(upload_to='images/', null=True, blank=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name="liked_post", blank=True)
    
    def __str__(self):
        return self.title or f"Post by {self.user.username}"
    
    def total_likes(self):
        return self.likes.count()

class Comments(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="liked_comments", blank=True)
    
    def __str__(self):
        return f"{self.user.username} commented on {self.post.title}"
    
    def total_likes(self):
        return self.likes.count()