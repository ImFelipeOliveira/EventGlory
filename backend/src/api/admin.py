from django.contrib import admin

from api.models import Endereco, Event, Pessoa

# Register your models here.

admin.site.register(Pessoa)
admin.site.register(Endereco)
admin.site.register(Event)
