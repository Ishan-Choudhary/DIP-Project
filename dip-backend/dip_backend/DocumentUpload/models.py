from django.db import models

def user_upload_path(instance, filename):
    from django.contrib.sessions.models import Session
    from django.utils.crypto import get_random_string

    session_key = instance.session_id or get_random_string(12)
    return f"temp_docs/{session_key}/{filename}"

# Create your models here.
class Document(models.Model):
    file = models.FileField(upload_to=user_upload_path, null=True)
    title = models.TextField(blank=False, null=False)
    content = models.CharField(max_length=5)
    page_count = models.IntegerField(blank=False)
