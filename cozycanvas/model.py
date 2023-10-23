import pymongo
import flask


def get_mongodb():
    if 'mongo_db' not in flask.g:
        client = pymongo.MongoClient(host="localhost", port=27017)
        flask.g.mongo_client = client
        flask.g.mongo_db = client["cozycanvas"]
    return flask.g.mongo_db
