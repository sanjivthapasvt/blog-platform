# Generated by Django 5.2 on 2025-04-05 08:19

import cloudinary_storage.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('love', '0002_alter_love_image_alter_love_video'),
    ]

    operations = [
        migrations.AlterField(
            model_name='love',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/love/'),
        ),
        migrations.AlterField(
            model_name='love',
            name='video',
            field=models.FileField(blank=True, null=True, upload_to='videos/love/', validators=[cloudinary_storage.validators.validate_video]),
        ),
    ]
