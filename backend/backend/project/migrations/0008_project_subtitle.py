# Generated by Django 5.2 on 2025-04-05 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0007_alter_project_image_alter_project_video'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='subtitle',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
