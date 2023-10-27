import { configureStore } from '@reduxjs/toolkit';
import ingredientFiltersReducer from './reducers/ingredientFilters';

const store = configureStore({
    reducer: {
        ingredientFilters: ingredientFiltersReducer,
        // Add more reducers as needed
    },
});

export default store;
