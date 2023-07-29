from django.db import models

# Create your models here.
class Hero(models.Model):
    name = models.CharField(max_length=64)
    tokens = models.ManyToManyField("Token", related_name="heroes", blank=True)
    theme = models.CharField(max_length=16, blank=True, null=True)
    one = models.CharField(max_length=16, blank=True, null=True)
    two = models.CharField(max_length=16, blank=True, null=True)
    three = models.CharField(max_length=16, blank=True, null=True)
    four = models.CharField(max_length=16, blank=True, null=True)
    five = models.CharField(max_length=16, blank=True, null=True)
    six = models.CharField(max_length=16, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"    

class Token(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(max_length=640)
    max = models.IntegerField()
    priority = models.IntegerField(default=5)

    def __str__(self):
        return f"{self.name}"

class Card(models.Model):
    phases = [
        ("main","main"),
        ("roll","roll"),
        ("instant","instant")
    ]

    name = models.CharField(max_length=64)
    description = models.TextField(max_length=640)
    cost = models.IntegerField(default=1)
    phase = models.CharField(max_length=8, choices=phases, default="main")
    hero = models.ForeignKey(Hero, related_name="deck", null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.name}"
    
class Upgrade(models.Model):
    slots = [(i,i) for i in range (1,10)]
    levels = [(i,i) for i in range (2,4)]

    name = models.CharField(max_length=64)
    description = models.TextField(max_length=640)
    cost = models.IntegerField(default=1)
    slot = models.IntegerField(choices=slots, default=1)
    level = models.IntegerField(choices=levels, default=2)
    hero = models.ForeignKey(Hero, related_name="upgrades", null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.hero}: slot {self.slot} level {self.level}"
    
class Adjustment(models.Model):
    slots = [(i,i) for i in range (1,10)]

    description = models.TextField(max_length=640)
    slot = models.IntegerField(choices=slots, default=1)
    hero = models.ForeignKey(Hero, related_name="adjustments", null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.description}"

