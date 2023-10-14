### Migrate csv dataset to Postgres database
import logging
import pandas as pd
import ast
from app import Recipe, Ingredient, RecipeIngredient, db, app
from sqlalchemy import create_engine

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

def main():
    # Create schema
    db.create_all()

    # Read data and clean up NER column
    df = pd.read_csv('RecipesDataset/recipes_data.csv')
    df['NER'] = df['NER'].apply(lambda x: set(ast.literal_eval(x)))
    df = df[df['NER'] != set()]

    # Create dataframes for each table
    all_ingredients = set.union(*df['NER'].tolist())
    ingredients_df = pd.DataFrame(list(all_ingredients), columns=['name'])

    recipes_df = df.drop(columns=['ingredients', 'directions', 'source', 'NER']).rename(columns={'title': 'name'})
    recipes_df['id'] = df.index
    recipes_df = recipes_df[['id', 'name', 'link', 'site']]

    recipe_ingredients_df = df.explode('NER')
    recipe_ingredients_df['recipe_id'] = recipe_ingredients_df.index
    recipe_ingredients_df = recipe_ingredients_df.drop(columns=['title', 'ingredients', 'directions', 'link', 'source', 'site']).rename(columns={'NER': 'ingredient'}).reset_index()
    recipe_ingredients_df = recipe_ingredients_df[['recipe_id', 'ingredient']]

    logging.debug('Created dfs')

    # Create tables
    ingredients_df.to_sql('ingredients', engine, if_exists='append', index=False)
    logging.debug('Created ingredients table')

    recipes_df.to_sql('recipes', engine, if_exists='append', index=False)
    logging.debug('Created recipes table')

    recipe_ingredients_df.to_sql('recipe_ingredients', engine, if_exists='append', index=False)
    logging.debug('Created recipe_ingredients table')

if __name__ == '__main__':
    logging.basicConfig(filename='app.log', level=logging.DEBUG)
    with app.app_context():
        main()