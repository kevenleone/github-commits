# Generated by Django 2.2.7 on 2019-11-24 14:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('repositories', '0002_auto_20191121_0217'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='repository',
            name='user_id',
        ),
        migrations.CreateModel(
            name='UserRepository',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=50)),
                ('repo_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='repositories.Repository')),
            ],
        ),
    ]