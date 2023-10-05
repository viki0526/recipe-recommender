from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from model import Recipes
import logging

# Initializing flask app
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Dagger@localhost/RecipesApp'

db = SQLAlchemy(app)

# Define schema
class Recipe:
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String, unique=True)
    site = db.Column(db.String, unique=True)
    source = db.Column(db.String, unique=True)
    def __init__(self, link, site, source):
        self.link = link
        self.site = site
        self.source = source

class Ingredient:
    __tablename__ = 'ingredients'
    name = db.Column(db.String, primary_key=True)
    def __init__(self, name):
        self.name = name

class RecipeIngredient:
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
    return

@app.route('/recipes', methods=['POST'])
def find_recipes():
    logging.debug(request)
    return 'test'
    # return recipes.find_recipes(ingredients)

# Run app
if __name__ == '__main__':
    app.run(debug=True)

