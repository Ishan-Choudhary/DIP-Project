from rest_framework.serializers import ModelSerializer
from DocumentUpload.models import Document

class DocumentUploadSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = ["file"]

class DocumentListSerializer(ModelSerializer):
    class Meta:
        model = Document
        exclude = ["content", "session_id"]
