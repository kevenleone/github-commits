# Generated by Django 2.2.7 on 2019-11-24 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commits', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='commit',
            name='repository',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
