from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response

from DocumentUpload.models import Document
from DocumentUpload.serializers import DocumentUploadSerializer, DocumentListSerializer
from DocumentUpload.utils import extract_text

# Create your views here
class DocumentUploadView(CreateAPIView):
    serializer_class = DocumentUploadSerializer 

    def post(self, request, *args, **kwargs):
        if not request.session.session_key:
            request.session.create()
            request.session["initialized"] = True
            request.session.save()
        
        session_id = request.session.session_key
        print("PRINTING SESSION ID HERE: ", session_id)
        file_obj = request.FILES.get("file")

        if not file_obj:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        ext = file_obj.name.split(".")[-1].lower()
        name = file_obj.name.split(".")[0]
        doc = Document(
            session_id = session_id,
            title = name, 
            content_type = ext,
        )
        doc.file = file_obj
        doc.save()

        doc.content = extract_text(doc.file.path, doc.content_type)
        doc.save()

        return Response({"message": "File uploaded successfully", "id": doc.id}, status=status.HTTP_201_CREATED)

class DocumentListView(ListAPIView):
    serializer_class = DocumentListSerializer

    def get_queryset(self):
        return Document.objects.filter(session_id=self.request.session.session_key) 

