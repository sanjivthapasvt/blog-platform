from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Post

User = get_user_model()

@receiver(m2m_changed, sender=Post.likes.through)
def post_liked(sender, instance, action, reverse, pk_set, **kwargs):
    if action == "post_add":
        user = User.objects.get(pk=list(pk_set)[0])
        print(f"{user.username} liked the post: {instance.title}")
