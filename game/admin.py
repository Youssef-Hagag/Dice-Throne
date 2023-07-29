from django.contrib import admin
from .models import Token, Card, Hero, Upgrade, Adjustment

# Register your models here.
class HeroAdmin(admin.ModelAdmin):
    filter_horizontal = ("tokens",)

class TokenAdmin(admin.ModelAdmin):
    list_display = ("name", "priority")

class CardAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "hero", "cost", "phase")

class UpgradeAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "hero", "slot", "cost")

class AdjustmentAdmin(admin.ModelAdmin):
    list_display = ("hero", "slot", "description") 

admin.site.register(Hero, HeroAdmin)
admin.site.register(Token, TokenAdmin)
admin.site.register(Card, CardAdmin)
admin.site.register(Upgrade, UpgradeAdmin)
admin.site.register(Adjustment, AdjustmentAdmin)
