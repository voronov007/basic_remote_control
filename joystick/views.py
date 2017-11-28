from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods, require_POST


# TODO @require_POST()
@require_http_methods(["GET", "POST"])
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")