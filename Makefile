path = venv

migrations:
	python manage.py makemigrations

migrate:
	python manage.py migrate

install:
	pip install -r requirements.txt

start:
	python manage.py runserver
