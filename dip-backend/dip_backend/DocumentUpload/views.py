from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here
class Home(APIView):
    def get(self, req, format=None):
        return Response("<h1>Hi hello</h1>", status=status.HTTP_200_OK)
