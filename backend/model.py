import pandas as pd
import ast

class Recipes:
    def __init__(self, filepath):
        self.df = pd.read_csv(filepath)
        self.all_ingredients = None
    
    def get_all_ingredients(self):
        if self.all_ingredients:
            return self.all_ingredients
        #eval NER to sets
        self.df['NER'] = self.df['NER'].apply(ast.literal_eval)
        self.df['NER'] = self.df['NER'].apply(lambda x: set(x))

        self.all_ingredients = set.union(*self.df['NER'].tolist())
        return self.all_ingredients
    
    def find_recipes(self, ingredients_to_check):
        mask = self.df['NER'].apply(lambda x : ingredients_to_check.issubset(set(x)))
        matching_rows = self.df[mask]
        return matching_rows.to_json()

if __name__ == '__main__':
    pass

