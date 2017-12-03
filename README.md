# basic_remote_control
Create a basic client server system for remote controlling the robot with a virtual joystick. Server Django application with one model - direction. The server will also have a post rest API. Client React.js based web app with nipple.js (https://github.com/yoannmoinet/nipplejs). The application will send every 100 ms post to the server with the direction of the nipple.

## Setup project
There are `frontend` and `backend` parts. Backend is based on Django and 
configured to run on `127.0.0.1:8000` ip address and port. 

Go to the root project directory and activate virtual environment:
`. venv/bin/activate` if your env directory has name `venv` and is in the 
project directory.

### Setup Django
To start Django for the first time:

1. `make install` or `pip install -r requirements.txt`
2. 'make migrate' or `python manage.py migrate`
3. `make start` or `python manage.py runserver`

To start Django (not for the first time)

- `make start` or `python manage.py runserver`

### Setup Frontend (react)
Go to the `frontend` directory in the project

!!! TODO check frontend setup when clone project from the git

```npm install```

```npm start```


## How it works
Fontend (React app) sets a joystick. When you press joystick you get data, 
this data sends to the server every 100ms. If we finish to communicate with 
the joystick we don't send data.
 
Backend server receives the data 
and saves it to the db. Mainly we want to save direction data which has `x`,
 `y` and `angle` cases. `Direction` models has datetime field(when data was 
 sent), full_data(save whole data, could be useful for future) and x,y,ange 
 for direction data. When db object was created and saved I print the result
  object.
  
 ## TODO
 1. Create logs (logger)
 2. Authentication and ability to receive data form the different IPs
 3. Tests
 4. Docker container (container based app)