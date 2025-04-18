# Generated by Django 5.2 on 2025-04-05 08:19

import cloudinary_storage.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0006_alter_project_image_alter_project_video'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/projects/'),
        ),
        migrations.AlterField(
            model_name='project',
            name='video',
            field=models.FileField(blank=True, null=True, upload_to='videos/', validators=[cloudinary_storage.validators.validate_video]),
        ),
    ]
