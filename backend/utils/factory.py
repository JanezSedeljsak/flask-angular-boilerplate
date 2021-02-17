  
import os
import sys
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS

def create_app(config):
    app = Flask(__name__, static_folder='./../../frontend')
    app.config.from_object(__name__)
    CORS(app)

    @app.after_request
    def add_header(response):
        return response

    @app.route('/api/heartbeat', methods=['GET', 'POST'])
    def heartbeat():
        return jsonify(message="It's working")


    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    @app.errorhandler(500)
    def server_error(e):
        return jsonify(error="500 internal error")

    @app.errorhandler(404)
    def not_found(e):
        return jsonify(error="404 route not found")

    return app