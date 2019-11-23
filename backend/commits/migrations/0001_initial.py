# Generated by Django 2.2.7 on 2019-11-23 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Commit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sha', models.CharField(max_length=50, unique=True)),
                ('author', models.CharField(max_length=50)),
                ('author_mail', models.EmailField(max_length=254)),
                ('author_avatar', models.CharField(blank=True, max_length=50)),
                ('message', models.CharField(max_length=5000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
