from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name="index"),
    path("hero/<str:hero_name>",views.hero, name="hero"),
]