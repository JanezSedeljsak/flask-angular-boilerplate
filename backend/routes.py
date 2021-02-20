from flask import Blueprint, jsonify, request
from sqlalchemy import select, delete
from .models import notes
from .methods import sqlExe, sqlAction

noteRoutes = Blueprint("notes", __name__, url_prefix='/api/note')

@noteRoutes.route('/get', methods=["POST"])
def get_notes():
    query = select([notes.c.Id, notes.c.Title, notes.c.Description, notes.c.DateCreated])
    get_multiple = True

    if request.get_json().get("id", False):
        id =  request.get_json()["id"]
        query = query.where(notes.c.Id == id)
        get_multiple = False

    elif request.get_json().get("titleFilter", False):
        search_text =  "".join(("%", request.get_json()["titleFilter"], "%"))
        query = query.where(notes.c.Title.like(search_text))

    result = sqlExe(query, multiple=get_multiple)

    return jsonify(result)

@noteRoutes.route('/create', methods=["POST"])
def create_note():
    data = request.get_json()

    # validate form
    for field in ["Title", "Description"]:
        if field not in data or data[field] == "":
            return jsonify(success=False, message="Invalid form data")

    data = {
        "Title": data["Title"],
        "Description": data["Description"]
    }
    
    query = notes.insert().values(data)
    result = sqlAction(query)

    return jsonify(success=True)

@noteRoutes.route('/modify/<id>', methods=["POST"])
def modify_note(id):
    data = request.get_json()

    # validate form
    for field in ["Id", "Title", "Description"]:
        if field not in data or data[field] == "":
            return jsonify(success=False, message="Invalid form data")


    data = {
        "Title": data["Title"],
        "Description": data["Description"]
    }

    query = notes.update().values(data).where(notes.c.Id==id)
    result = sqlAction(query)

    return jsonify(result)

@noteRoutes.route('/delete/<id>', methods=["POST"])
def delete_note(id):
    
    query = delete(notes).where(notes.c.Id == id)
    result = sqlAction(query)

    return jsonify(success=True)

