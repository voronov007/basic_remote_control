from datetime import datetime

from django.http.response import JsonResponse
from django.views.decorators.http import require_POST
import json

from .models import Direction


@require_POST
def index(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, TypeError):
        return JsonResponse({'error': 'JSON decoding error!'}, status=400)

    try:
        direction = data["direction"]
    except KeyError:
        return JsonResponse({'message': 'no direction data'}, status=200)

    # TODO create time 'created_at' on front-end side
    current_time = datetime.now()

    direction_obj = Direction.objects.create(
        created_at=current_time,
        full_data=str(data),
        x=direction["x"],
        y=direction["y"],
        angle=direction["angle"]
    )
    print(direction_obj)

    return JsonResponse(
        {
            "status": "created",
            "message": "coordinates were created"},
        status=201
    )
