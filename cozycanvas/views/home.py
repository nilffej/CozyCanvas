import flask
import cozycanvas
import pprint

@cozycanvas.app.route('/', methods=['GET'])
def home_page():
    db = cozycanvas.model.get_mongodb()
    collection = db["houses"]
    collection.insert_one({
        "test": "hi",
    })
    print(collection.find_one())
    return collection.find_one()["test"]
