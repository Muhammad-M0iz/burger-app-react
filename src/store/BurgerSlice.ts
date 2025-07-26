import { createSlice } from "@reduxjs/toolkit";
import type { Burger } from "../../types/burger";

const initialState: Burger = {
    ingredients: [
        { name: "Lettuce", price: 0.5, quantity: 1 },
        { name: "Cheese", price: 0.4, quantity: 1 },
        { name: "Meat", price: 1.3, quantity: 1 },
        { name: "Bacon", price: 0.7, quantity: 1 }
    ],
    totalPrice: 2.9,
}

const BurgerSlice = createSlice({
    name: "burger",
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            const ingredient = state.ingredients.find(ing => ing.name === action.payload.name);
            if (ingredient) {
                ingredient.quantity += 1;
            }
            state.totalPrice = state.ingredients.reduce((total, ing) => 
                total + (ing.price * ing.quantity), 0
            );
        },
        removeIngredient: (state, action) => {
            const ingredient = state.ingredients.find(ing => ing.name === action.payload.name);
            if (ingredient && ingredient.quantity > 0) {
                ingredient.quantity -= 1;
            }
            state.totalPrice = state.ingredients.reduce((total, ing) => 
                total + (ing.price * ing.quantity), 0
            );
        },
        clearIngredients: (state) => {
            state.ingredients.forEach(ing => ing.quantity = 0);
            state.totalPrice = 0;
        }
    }
});

export const { addIngredient, removeIngredient, clearIngredients } = BurgerSlice.actions;
export default BurgerSlice.reducer;
