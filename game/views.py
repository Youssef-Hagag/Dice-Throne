import json
from django.shortcuts import render
from django.http import JsonResponse
from .models import Hero,Card,Upgrade,Token

# Create your views here.

def index(request):
    heroes = list(Hero.objects.all().values())
    heroes.sort(key = sortByName)
    
    return render(request, "game/index.html",{
        "heroes":heroes,
    })

def hero(request, hero_name):
    #collecting the hero's deck
    general_cards = list(Card.objects.filter(hero__name = None).values())
    own_cards = list(Card.objects.filter(hero__name = hero_name).values())
    upgrades = list(Upgrade.objects.filter(hero__name = hero_name).values())
    deck = general_cards + own_cards + upgrades

    # potentially for a "reduced upgrade cost" option
    for upgrade in upgrades:
        upgrade["cost"] -= 1

    hero = Hero.objects.filter(name = hero_name).first()
    tokens = list(hero.tokens.all().values())
    tokens.sort(key = sortByPriority)
    adjustments = list(hero.adjustments.all().values())

    return render(request, "game/hero.html", {
        "hero": hero_name,
        "deck": deck,
        "tokens": tokens,
        "upgrades": upgrades,
        "icons": [hero.one,hero.two,hero.three,hero.four,hero.five,hero.six],
        "theme": hero.theme,
        "adjustments": adjustments,
    })

def sortByName(item):
    return item['name']

def sortByPriority(item):
    return item['priority']

