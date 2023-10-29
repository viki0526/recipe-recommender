from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.orm import relationship
import logging
import re

# Initializing flask app
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Dagger@localhost:5432/RecipesApp'

db = SQLAlchemy(app)

engine = db.create_engine(app.config['SQLALCHEMY_DATABASE_URI'], echo=True)
conn = engine.connect() 

logging.basicConfig(filename='app.log', level=logging.DEBUG)
logging.getLogger('flask_cors').level = logging.DEBUG

def setup_postgres_extensions():
    conn.execute(text("CREATE EXTENSION IF NOT EXISTS pg_trgm;"))

with app.app_context():
    setup_postgres_extensions()

# Define schema
class Recipe(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ingredient_names = db.Column(db.ARRAY(db.String), nullable=False)
    ingredients = db.Column(db.ARRAY(db.String)) 
    directions = db.Column(db.ARRAY(db.String)) 
    link = db.Column(db.String)
    site = db.Column(db.String)
    def __init__(self, id, name, ingredients, directions, link, site):
        self.id = id
        self.name = name
        self.ingredients = ingredients
        self.directions = directions
        self.link = link
        self.site = site

class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    name = db.Column(db.String, primary_key=True)
    def __init__(self, name):
        self.name = name

# Define routes
@app.route('/')
def main():
    return {'message': 'hello world'}, 200

@app.route('/search-ingredients', methods=['POST'])
def search_ingredients():
    query = request.get_json().get("searchQuery")
    sql = text(
        "SELECT * FROM ingredients ORDER BY SIMILARITY(name, :str) DESC LIMIT 10;"
    )
    result = conn.execute(sql, {'str': query})
    logging.debug(result)
    result_list = [x.name for x in result]
    return jsonify(result_list), 200

@app.route('/recipe-autocomplete', methods=['POST'])
def recipe_autocomplete():
    query = '%' + request.get_json().get("recipeSearchQuery") + '%'
    sql = text(
        "SELECT name FROM recipes WHERE name like :str GROUP BY name ORDER BY COUNT(*) DESC LIMIT 5;"
    )
    result = conn.execute(sql, {'str': query})
    logging.debug(result)
    result_list = [x.name for x in result]
    return jsonify(result_list), 200

@app.route('/recipe-search', methods=['POST'])
def find_recipes():
    search_string = '%' + request.get_json().get("recipeSearchQuery") + '%'
    ingredients_to_check = request.get_json().get("ingredientFilters")
    sql_str = '''
        SELECT id, name, ingredient_names, ingredients, directions
        FROM recipes
        WHERE name ILIKE :name
        ORDER BY id
    '''
    # Empty list check for ingredient filters
    if ingredients_to_check:
        sql_str = '''
            WITH r AS (
                SELECT r.id, r.name, r.ingredient_names, r.ingredients, r.directions
                FROM recipes r
                WHERE r.name ILIKE :name
                ORDER BY r.id
            )
            SELECT r.id, r.name, r.ingredient_names, r.ingredients, r.directions
            FROM r WHERE
            NOT EXISTS (
                SELECT i.ingredient
                FROM unnest(:ingredients) AS i(ingredient)
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM unnest(r.ingredient_names) AS ing
                    WHERE ing ILIKE '%' || i.ingredient || '%'
                )
            )
        '''
    sql_str += '''LIMIT 100;'''
    sql = text(sql_str)
    result = conn.execute(sql, {'name': search_string, 'ingredients': ingredients_to_check})
    logging.debug(result)
    result_list = [{'id': x.id, 'name': x.name, 'ingredient_names': x.ingredient_names, 'ingredients': x.ingredients, 'directions': x.directions} for x in result]
    return jsonify(result_list), 200

# Run app
if __name__ == '__main__':
    app.run(debug=True)
    logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

