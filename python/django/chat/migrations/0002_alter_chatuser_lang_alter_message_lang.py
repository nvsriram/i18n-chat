# Generated by Django 4.1.1 on 2023-05-03 04:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatuser',
            name='lang',
            field=models.CharField(default='en', max_length=2),
        ),
        migrations.AlterField(
            model_name='message',
            name='lang',
            field=models.CharField(default='en', max_length=2),
        ),
    ]
