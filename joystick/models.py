from django.db import models


class Direction(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    full_data = models.TextField()
    x = models.CharField(max_length=10)
    y = models.CharField(max_length=10)
    angle = models.CharField(max_length=10)

    def __str__(self):
        return 'Direction(id={id}, x={x}, y={y}, angle={angle})'.format(
            id=self.id, x=self.x, y=self.y, angle=self.angle
        )

    def __repr__(self):
        return self.__str__()
