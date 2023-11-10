import flask
import cozycanvas

# @cozycanvas.app.route('/', methods=['GET'])
# def home_page():
#     db = cozycanvas.model.get_mongodb()
#     collection = db["houses"]
#     collection.insert_one({
#         "test": "hi",
#     })
#     print(collection.find_one())
#     return {"test": collection.find_one()["test"]}

@cozycanvas.app.route('/', methods=['GET'])
def home_page():
    return {"test": cozycanvas.model.get_item_info()}
