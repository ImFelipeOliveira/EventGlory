from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from localflavor.br.models import BRCPFField, BRStateField


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


class Endereco(models.Model):
    logradouro = models.CharField(max_length=40)
    numero = models.IntegerField(null=True, blank=True)
    bairro = models.CharField(max_length=40)
    cidade = models.CharField(max_length=10)

    def __str__(self):  # noqa: D105
        return f"{self.logradouro}, {self.numero}"


class Contato(models.Model):
    telefone = models.CharField(max_length=14)


class PessoaQuerySet(models.QuerySet["Pessoa"]):
    def dependentes_from_user(self, user):
        return self.filter(responsavel__user=user)


class Pessoa(models.Model):
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
    start_date = models.DateTimeField(
        verbose_name="Data de Início",
        help_text="Data de ínicio do evento",
    )
    end_date = models.DateTimeField(
        verbose_name="Data de Fim",
        help_text="Data de fim do Evento.",
    )
    description = models.TextField(blank=True, null=True, verbose_name="Descrição")
    min_age = models.DateField(
        null=True,
        verbose_name="Idade mínima",
        help_text="Idade mínima para inscrição no evento.",
    )
    price = models.DecimalField(
        decimal_places=2,
        max_digits=6,
        verbose_name="Preço",
    )

    max_participants = models.PositiveBigIntegerField(
        verbose_name="Capacidade máxima",
        help_text="Número máximo de participantes permitidos",
        blank=True,
        null=True,
    )
    city = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Cidade",
    )
    state = BRStateField(
        blank=True,
        null=True,
        verbose_name="Estado",
    )
    registration_deadline = models.DateTimeField(
        verbose_name="Data limite para inscrição",
        help_text="Data limite para os participantes se inscreverem",
        blank=True,
        null=True,
    )
    categories = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Categorias",
        help_text="Categorias separadas por vírgula (ex: Música, Jovens, Culto)",
    )
    requires_payment = models.BooleanField(
        default=False,
        verbose_name="Requer pagamento",
        help_text="Indica se o evento requer pagamento para participação",
    )

    def __str__(self):  # noqa: D105
        return f"{self.name}"

    def is_registration_open(self):
        """Verifica se as inscrições ainda estão abertas."""
        return timezone.now() <= self.registration_deadline

    def get_available_spots(self):
        """Retorna o número de vagas disponíveis."""
        registered_count = self.eventos.count()
        return max(0, self.max_participants - registered_count)

    class Meta:
        ordering = ["-start_date"]


class RegistrationQuerySet(models.QuerySet["Registration"]):
    def user_events(self, user):
        return self.filter(pessoas__user=user)


class Registration(models.Model):
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
