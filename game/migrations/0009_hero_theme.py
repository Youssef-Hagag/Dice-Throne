# Generated by Django 4.2.3 on 2023-07-21 00:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0008_hero_five_hero_four_hero_one_hero_six_hero_three_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='hero',
            name='theme',
            field=models.CharField(blank=True, max_length=16, null=True),
        ),
    ]
