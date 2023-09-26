import flask
import cozycanvas

@cozycanvas.app.route('/', methods=['GET'])
def home_page():
    return "test"
