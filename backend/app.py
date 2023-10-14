from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship
import logging
import json

# Initializing flask app
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Dagger@localhost:5432/RecipesApp'

db = SQLAlchemy(app)

engine = db.create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
conn = engine.connect() 

logging.basicConfig(filename='app.log', level=logging.DEBUG)

# Define schema
class Recipe(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    link = db.Column(db.String)
    site = db.Column(db.String)
    def __init__(self, id, name, link, site):
        self.id = id
        self.name = name
        self.link = link
        self.site = site

class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    name = db.Column(db.String, primary_key=True)
    def __init__(self, name):
        self.name = name

class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredients'
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), primary_key=True)
    ingredient = db.Column(db.String, db.ForeignKey('ingredients.name'), primary_key = True)
    def __init__(self, recipe_id, ingredient):
        self.recipe_id = recipe_id
        self.ingredient = ingredient

# Define routes
@app.route('/')
def main():
    return {'message': 'hello world'}, 200

@app.route('/get-ingredients')
def get_ingredients():
    query = Ingredient.query.all()
    obj = [x.name for x in query]
    logging.debug(obj)
    return jsonify(obj), 200


@app.route('/recipes', methods=['POST'])
def find_recipes():
    logging.debug(request)
    return 'test'

# Run app
if __name__ == '__main__':
    app.run(debug=True)
