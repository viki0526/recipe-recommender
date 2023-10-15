### Clean up, validate and migrate csv dataset to Postgres database
import logging
import pandas as pd
import ast
import re
import inflect
import json
from app import Recipe, Ingredient, RecipeIngredient, db, app
from sqlalchemy import create_engine

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

def remove_non_alphabet(s):
    return {re.sub(r'[^a-zA-Z ]', '', word) for word in s}

def check_ingredients(s, ings):
    food_items = s.intersection(ings)
    return food_items

def get_ingredients():
    p = inflect.engine()
    with open('RecipesDataset/train.json', 'r') as file:
        data = json.load(file)
    ings = set()
    for recipe in data:
        s = recipe["ingredients"]
        ings.update(s)
    opposite = set()
    for x in ings:
        alt = None
        if p.singular_noun(x):
            alt = p.singular_noun(x)
        else:
            alt = p.plural(x)
        if alt:
            opposite.add(alt)
    ings = ings.union(opposite)
    return ings

def main():
    # Create schema
    db.create_all()

    # Read data and clean up NER column
    df = pd.read_csv('RecipesDataset/recipes_data.csv')
    df['NER'] = df['NER'].apply(lambda x: set(ast.literal_eval(x)))
    df['NER'] = df['NER'].apply(remove_non_alphabet)

    # Create validation set of over 1500 ingredients
    all_ingredients = get_ingredients()

    # Clean up NER column by matching to ingredient validation set
    df['NER'] = df['NER'].apply(lambda x: check_ingredients(x, all_ingredients))
    df = df[df['NER'] != set()]

    # Create dataframes for each table
    ingredients_df = pd.DataFrame(list(all_ingredients), columns=['name'])

    recipes_df = df.drop(columns=['ingredients', 'directions', 'source', 'NER']).rename(columns={'title': 'name'})
    recipes_df['id'] = df.index
    recipes_df = recipes_df[['id', 'name', 'link', 'site']]

    recipe_ingredients_df = df.explode('NER')
    recipe_ingredients_df['recipe_id'] = recipe_ingredients_df.index
    recipe_ingredients_df = recipe_ingredients_df.drop(columns=['title', 'ingredients', 'directions', 'link', 'source', 'site']).rename(columns={'NER': 'ingredient'}).reset_index()
    recipe_ingredients_df = recipe_ingredients_df[['recipe_id', 'ingredient']]

    logging.debug('Created dfs')

    # Populate tables
    ingredients_df.to_sql('ingredients', engine, if_exists='append', index=False)
    logging.debug('Populated ingredients table')

    recipes_df.to_sql('recipes', engine, if_exists='append', index=False)
    logging.debug('Populated recipes table')

    recipe_ingredients_df.to_sql('recipe_ingredients', engine, if_exists='append', index=False)
    logging.debug('Populated recipe_ingredients table')

if __name__ == '__main__':
    logging.basicConfig(filename='app.log', level=logging.DEBUG)
    with app.app_context():
        main()