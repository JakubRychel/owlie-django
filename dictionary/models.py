from django.db import models

class Language(models.Model):
    code = models.CharField(max_length=2, primary_key=True)
    flag_code = models.CharField(max_length=2, null=True, blank=True)