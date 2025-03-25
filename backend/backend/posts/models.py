from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=250, blank=True, null=True)
    content = models.TextField(default=None)
    img = models.ImageField(upload_to='images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, through='PostLike', related_name='liked_post', blank=True)
    
    def __str__(self):
        return self.title or f"Post by {self.user.username}"
    
    def total_likes(self):
        return self.likes.count()
    
    def delete(self, *args, **kwargs):
        if self.img:
            storage, path = self.img.storage, self.img.path
            if storage.exists(path):
                storage.delete(path)
        super().delete(*args, **kwargs)

class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'post')    

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, through='CommentLike', related_name="liked_comments", blank=True)    
    def __str__(self):
        return f"{self.user.username} commented on {self.post.title or 'untitled post'}"
    
    def total_likes(self):
        return self.likes.count()
        
class CommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)