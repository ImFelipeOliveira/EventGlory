# Generated by Django 5.1.6 on 2025-02-22 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_event_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
