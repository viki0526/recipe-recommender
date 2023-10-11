### Migrate csv dataset to Postgres database
import pandas as pd
import ast
from app import Recipe, Ingredient, RecipeIngredient, db, app

def main():
    df = pd.read_csv('RecipesDataset/recipes_data.csv')
    df['NER'] = df['NER'].apply(lambda x: set(ast.literal_eval(x)))

    # Populate ingredients table with all ingredients in dataset
    all_ingredients = set.union(*df['NER'].tolist())
    for ingredient in all_ingredients:
        ing = Ingredient(ingredient)
        db.session.add(ing)
    db.session.commit()

    # Populate recipes table and recipes-ingredients relation table
    for idx, row in df.iterrows():
        name = row['title']
        link = row['link']
        site = row['site']
        recipe = Recipe(idx, name, link, site)
        db.session.add(recipe)
        for ingredient in row['NER']:
            recipe_ingredient = RecipeIngredient(idx, ingredient)
            db.session.add(recipe_ingredient)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        main()