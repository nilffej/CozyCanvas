# CozyCanvas

## Developing

1. `$ docker-compose up mongodb`
2. In a new terminal: `$ python3 -m venv venv`
3. `$ source venv/bin/activate`
4. `$ pip install -r requirements.txt`
5. `$ flask --app cozycanvas --debug run --host 0.0.0.0 --port 8000`
6. Go to 127.0.0.1:8000 for the flask page

## Docker stuff

- If you update `docker-compose.yaml` or `Dockerfile`, make sure you build again by running `docker-compose build`
