# Generated by Django 4.2.3 on 2023-07-19 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0004_remove_card_cp_remove_hero_cards_card_cost_card_hero_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hero',
            name='tokens',
            field=models.ManyToManyField(related_name='heroes', to='game.token'),
        ),
    ]