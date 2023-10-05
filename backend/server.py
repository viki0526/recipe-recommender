from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from model import Recipes
import logging

# Initializing flask app
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://site.db'
db = SQLAlchemy(app)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)




@app.route('/get-ingredients')
def get_ingredients():
    return

@app.route('/recipes', methods=['POST'])
def find_recipes():
    logging.debug(request)
    return 'test'
    # return recipes.find_recipes(ingredients)

# Running app
if __name__ == '__main__':
    app.run(debug=True)

