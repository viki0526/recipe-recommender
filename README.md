# recipe-recommender
Extract features from natural language recipes dataset and recommend recipes based on features (eg. ingredients, calories, macronutrients etc)
# Setup instructions
- Install python dependencies (Ensure you have Python 3.9 installed)
```
pip install SQLAlchemy flask flask_cors flask_sqlalchemy pandas
```
- Create a postgresql connection and add the sqlalchemy URI to /recipe-recommender/backend/settings.json under key 'postgres_uri'
- Navigate to /recipe-recommender/backend/ and run the following command to start the flask server at localhost:5000
```
flask run
```
- Navigate to /recipe-recommender/frontend/ and add the firebase config object under key 'firebase_settings'
- Navigate to /recipe-recommender/frontend/ and run the following to install React dependencies and run the React development server
```
npm i
npm start
```
# # To-do
- Calorie prediction and cuisine classification with ML
- User ratings and collaborative filtering
