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
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="%(class)s_created",
        verbose_name="created_by",
    )
    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="%(class)s_updated",
        verbose_name="updated_by",
    )

    class Meta:
        abstract = True
        ordering = ["-created"]


class Endereco(BaseModel):
    logradouro = models.CharField(max_length=40)
    numero = models.IntegerField(null=True, blank=True)
    bairro = models.CharField(max_length=40)
    cidade = models.CharField(max_length=10)

    def __str__(self):  # noqa: D105
        return f"{self.logradouro}, {self.numero}"


class Contato(BaseModel):
    telefone = models.CharField(max_length=14)


class PessoaQuerySet(models.QuerySet["Pessoa"]):
    def dependentes_from_user(self, user):
        return self.filter(responsavel__user=user)


class Pessoa(BaseModel):
    objects: PessoaQuerySet = PessoaQuerySet().as_manager()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,  # Permite que dependentes não tenham user
        blank=True,
    )
    name = models.CharField()
    cpf = BRCPFField(blank=True, null=True)
    date_of_birth = models.DateField(null=True)
    sexo = models.CharField(
        choices=Sexo,
        max_length=1,
    )
    endereco = models.ForeignKey(
        Endereco,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="moradores",
    )
    responsavel = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="dependentes",
    )

    def __str__(self):  # noqa: D105
        return f"{self.name}"


class Event(BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    name = models.CharField()
    image = models.ImageField(
        upload_to="logos/",
        verbose_name="logo",
        blank=True,
        null=True,
    )
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.TextField(blank=True, null=True)
    min_age = models.DateField(null=True)
    price = models.DecimalField(decimal_places=2, max_digits=6)

    def __str__(self):  # noqa: D105
        return f"{self.name}"


class RegistrationQuerySet(models.QuerySet["Registration"]):
    def user_events(self, user):
        return self.filter(pessoas__user=user)


class Registration(BaseModel):
    objects: RegistrationQuerySet = RegistrationQuerySet.as_manager()

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

    @property
    def user_is_register(self, user, event_id):
        return self.filter(pessoas__user=user).exists()


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
