from django.db import models

def user_upload_path(instance, filename):

    session_key = instance.session_id
    print(session_key)
    return f"temp_docs/{session_key}/{filename}"

# Create your models here.
class Document(models.Model):
    session_id = models.CharField(max_length=50, blank = True, null = True)
    file = models.FileField(upload_to=user_upload_path, null=True)
    title = models.TextField(blank=False, null=False)
    content = models.TextField(blank=True)
    content_type = models.CharField(max_length=5, blank=True)
