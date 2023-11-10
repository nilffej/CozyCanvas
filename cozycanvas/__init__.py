import flask
from flask_cors import CORS
import ikea_api

app = flask.Flask(__name__)
CORS(app)   # Necessary wrapper for requests from front-end

app.config.from_object('cozycanvas.config')
app.config.from_envvar('INSTA485_SETTINGS', silent=True)


import cozycanvas.views  # noqa: E402  pylint: disable=wrong-import-position
import cozycanvas.model
