# Generated by Django 5.1.6 on 2025-02-24 00:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_event_logo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='logo',
        ),
        migrations.AddField(
            model_name='event',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='logos/', verbose_name='logo'),
        ),
    ]
