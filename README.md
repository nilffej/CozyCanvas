# CozyCanvas

## Developing

1. `brew install mongocli`
2. `$ docker-compose up mongodb`
3. `$ python3 -m venv venv`
4. `$ source venv/bin/activate`
5. `$ pip install -r requirements.txt`
6. `$ flask --app cozycanvas --debug run --host 0.0.0.0 --port 8000`
7. Go to 127.0.0.1:8000 for the flask page

## Docker stuff

- If you update `docker-compose.yaml` or `Dockerfile`, make sure you build again by running `docker-compose build`