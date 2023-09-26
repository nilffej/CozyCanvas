import flask

app = flask.Flask(__name__)

app.config.from_object('cozycanvas.config')
app.config.from_envvar('INSTA485_SETTINGS', silent=True)

import cozycanvas.views  # noqa: E402  pylint: disable=wrong-import-position
import cozycanvas.model
