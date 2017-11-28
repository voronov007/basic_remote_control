from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^control/', include('joystick.urls')),
    url(r'^admin/', admin.site.urls),
]
