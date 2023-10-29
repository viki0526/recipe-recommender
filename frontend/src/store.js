import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use 'localStorage' as the storage engine
import ingredientFiltersReducer from './reducers/ingredientFilters';

const rootReducer = combineReducers({
    ingredientFilters: ingredientFiltersReducer,
    // Add more reducers as needed
});

const persistConfig = {
    key: 'root',
    storage, // Use 'localStorage' as the storage engine
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
    // Additional store configuration options go here
});

export const persistor = persistStore(store); // Export the persistor

export default store;
