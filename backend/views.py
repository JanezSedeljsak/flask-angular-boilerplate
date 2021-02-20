from flask import Blueprint, jsonify
from sqlalchemy import select
from .models import notes
from .methods import sqlExe

noteRoutes = Blueprint("notes", __name__, url_prefix='/api/note/')

@noteRoutes.route('/get', methods=["GET"])
def get_notes():
    query = select([notes.c.Title, notes.c.Description, notes.c.DateCreated])
    result = sqlExe(query)

    return jsonify(result)

@noteRoutes.route('/create', methods=["POST"])
def create_note():
    query = select([notes.c.Title, notes.c.Description, notes.c.DateCreated])
    result = sqlExe(query)

    return jsonify(result)

@noteRoutes.route('/modify/:id', methods=["POST"])
def modify_note():
    query = select([notes.c.Title, notes.c.Description, notes.c.DateCreated])
    result = sqlExe(query)

    return jsonify(result)

@noteRoutes.route('/delete/:id', methods=["POST"])
def delete_note():
    query = select([notes.c.Title, notes.c.Description, notes.c.DateCreated])
    result = sqlExe(query)

    return jsonify(result)
