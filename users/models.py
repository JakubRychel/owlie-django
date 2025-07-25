from django.utils import timezone
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager


class VerificationToken(models.Model):
    token = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return self.created_at < timezone.now() - timezone.timedelta(hours=3)
    

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Użytkownik musi mieć adres email')
        email = self.normalize_email(email)
        extra_fields.setdefault('is_verified', True)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_verified', True)

        return self.create_user(username, email, password, **extra_fields)
    

class User(AbstractUser):
    registered_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    email = models.EmailField(unique=True)

    profile_image = models.ImageField(
        upload_to='profile_images/', default='profile_images/default_profile_image.png', null=True, blank=True
    )

    is_verified = models.BooleanField(default=False)
    verification_token = models.OneToOneField(
        'VerificationToken', on_delete=models.SET_NULL, null=True, blank=True, related_name='user'
    )

    site_language = models.ForeignKey(
        'dictionary.Language', on_delete=models.SET_NULL, null=True, blank=True, related_name='site_language'
    )
    native_languages = models.ManyToManyField('dictionary.Language', blank=True, related_name='native_languages')
    known_languages = models.ManyToManyField('dictionary.Language', blank=True, related_name='known_languages')
    languages_to_learn = models.ManyToManyField('dictionary.Language', blank=True, related_name='languages_to_learn')

    objects = UserManager()
