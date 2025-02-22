from django.contrib.auth.models import User
from django.db import models


class Sexo(models.TextChoices):
    MASCULINO = "M", "Masculino"
    FEMININO = "F", "Feminino"


class RegStatus(models.TextChoices):
    PENDENTE = "Pendente"
    CONFORMADO = "Confirmado"
    CANCELADO = "Cancelado"


class PayStatus(models.TextChoices):
    PENDENTE = "Pendente"
    COMPLETO = "Completo"
    FALHOU = "Falhou"


class BaseModel(models.Model):
    update = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Endereco(BaseModel):
    rua = models.CharField(max_length=40)
    bairro = models.CharField(max_length=40)
    cidade = models.CharField(max_length=10)


class Contato(BaseModel):
    telefone = models.CharField(max_length=14)


class Pessoa(BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    name = models.CharField()
    sexo = models.CharField(
        choices=Sexo,
        max_length=1,
    )
    endereco = models.ForeignKey(
        Endereco,
        on_delete=models.CASCADE,
        related_name="enderecos",
    )
    responsavel = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="dependentes",
    )


class Event(BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    name = models.CharField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    price = models.DecimalField(decimal_places=2, max_digits=6)


class Registration(BaseModel):
    event = models.ManyToManyField(
        Event,
        related_name="eventos",
    )
    pessoas = models.ManyToManyField(
        Pessoa,
        related_name="pessoas_registradas",
    )
    status = models.CharField(
        choices=RegStatus,
        default=RegStatus.PENDENTE,
    )


class Payment(models.Model):
    registration = models.ForeignKey(Registration, on_delete=models.CASCADE)
    data_payment = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        blank=True,
        null=True,
    )
    status = models.CharField(
        choices=PayStatus,
        default=PayStatus.PENDENTE,
        blank=True,
        null=True,
    )
