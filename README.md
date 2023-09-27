# CozyCanvas

## Development

### Setting up virtual environment and installing npm packages

1. `$ python3 -m venv venv`
2. `$ source venv/bin/activate`
3. `$ pip install -r requirements.txt`
4. `$ cd frontend/`
5. `$ npm install`

Virtual environment must be activated before starting Flask server (**Step 2**).

### Start Docker, Flask, and React

1. In a new terminal: `$ docker-compose up mongodb`
2. In a new terminal, with venv activated: `$ flask --app cozycanvas --debug run --host 0.0.0.0 --port 8000`
3. In a new terminal, from the `frontend/` directory: `$ npm start:frontend`
4. Navigate to [127.0.0.1:3000/](http://127.0.0.1:3000)

Alternatively, from the `frontend/` directory, you may run `$ npm start` to start all three processes concurrently. However, all terminal output will be in a single terminal. Output from different processes can be distinguished by their `[#]` prefix.

## Docker stuff

- If you update `docker-compose.yaml` or `Dockerfile`, make sure you build again by running `docker-compose build`
