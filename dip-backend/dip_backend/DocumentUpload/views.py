from rest_framework.generics import ListCreateAPIView

from DocumentUpload.models import Document
from DocumentUpload.serializers import DocumentSerializer

# Create your views here
class DocumentView(ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer 