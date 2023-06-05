from flask import Flask, jsonify
import openai
import os
from flask_cors import CORS

# load modules
from blueprints.blueprint_openai import blueprint_openai

# init Flask app
app = Flask(__name__)
CORS(app, origins='*')

openai.api_key = os.environ.get("OPENAI_API_KEY")

# register blueprints. ensure that all paths are versioned!
app.register_blueprint(blueprint_openai, url_prefix="/api/v1/")

if __name__ == "__main__":
    app.run()
