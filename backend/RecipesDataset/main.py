import spacy

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Sample list of ingredients
ingredients = [
    "3 whole chicken breasts, cooked, deboned and cut in bite-size pieces",
    "16 oz. sour cream",
    "2 cans cream of mushroom soup (undiluted)",
    "1 can or 2 boxes Stove Top stuffing mix (prepare as directed on package)"
]

# Initialize a set to store unique food-related entities
food_entities = set()

# Process each ingredient
for ingredient in ingredients:
    doc = nlp(ingredient.lower())  # Tokenize and convert to lowercase
    print(doc.ents)
    for ent in doc.ents:
        if ent.label_ in ["PRODUCT", "ORG"]:
            food_entities.add(ent.text)

# food_entities.remove("package")

# Print the final list of normalized ingredients
print(list(food_entities))

