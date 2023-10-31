import pymongo
import flask
import ikea_api

def get_mongodb():
    if 'mongo_db' not in flask.g:
        client = pymongo.MongoClient(host="localhost", port=27017)
        flask.g.mongo_client = client
        flask.g.mongo_db = client["cozycanvas"]
    return flask.g.mongo_db

def get_item_info():
    if 'iows_items' not in flask.g:
        constants = ikea_api.Constants(country="us", language="en")
        iows_items = ikea_api.PipItem(constants)
        flask.g.iows_items = iows_items
    endpoint = flask.g.iows_items.get_item('69009475')
    return ikea_api.run(endpoint)
