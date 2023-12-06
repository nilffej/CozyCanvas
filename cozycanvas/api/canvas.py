import cozycanvas
from flask import request, abort, jsonify, make_response


@cozycanvas.app.route('/canvas', methods=['GET', 'POST'])
def canvases():
    db = cozycanvas.model.get_mongodb()
    canvases = db['canvases']

    if request.method == 'GET':
        all = list(canvases.find())
        for c in all:
            c['url'] = f"/canvas/{c['_id']}"
            del c['_id']
        return all
    elif request.method == 'POST':
        contents = request.json
        print("Entering: ", contents)
        result = canvases.insert_many(contents)
        inserted_ids = result.inserted_ids
        return jsonify([f"/canvas/{id}" for id in inserted_ids])
    else:
        raise NotImplementedError()


@cozycanvas.app.route('/canvas/<id>', methods=["GET", "PUT", "DELETE"])
def canvas(id):
    db = cozycanvas.model.get_mongodb()
    canvases = db['canvases']
    if request.method == 'GET':
        print("finding with id", id)
        found = canvases.find_one({"_id": id})
        if found is None:
            abort(404)
        return found
    elif request.method == 'PUT':
        newElement = dict(request.form)
        newElement['_id'] = id
        r = canvases.replace_one({"_id": id}, newElement)
        if not r.acknowledged or r.matched_count == 0:
            abort(400)
        return make_response('', 200)
    elif request.method == 'DELETE':
        result = canvases.delete_one({"_id": id})
        if result.deleted_count != 1:
            return make_response('', 400)
        return make_response('', 200)
    else:
        raise NotImplementedError()
