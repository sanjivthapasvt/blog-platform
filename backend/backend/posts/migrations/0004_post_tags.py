# Generated by Django 5.1.7 on 2025-03-27 04:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_alter_post_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='tags',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
