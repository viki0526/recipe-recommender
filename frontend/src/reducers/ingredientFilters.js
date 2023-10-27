import { createSlice } from '@reduxjs/toolkit';

const ingredientFiltersSlice = createSlice({
    name: 'ingredientFilters',
    initialState: [],
    reducers: {
        setIngredientFilters: (state, action) => {
            return action.payload;
        },
    },
});

export const { setIngredientFilters } = ingredientFiltersSlice.actions;
export default ingredientFiltersSlice.reducer;
