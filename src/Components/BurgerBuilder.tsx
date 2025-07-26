import type { Burger as BurgerType } from "../../types/burger";
import { useDispatch ,useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { clearIngredients,removeIngredient,addIngredient } from "../store/BurgerSlice";
import { Link } from "react-router-dom";
import { buttonStyles, cardStyles } from "../assets/burgerCSS";

export default function Burger(): React.ReactElement {
    const burger = useSelector((state: { burger: BurgerType }) => state.burger);
    const dispatch = useDispatch();

    return (
        <div className="space-y-8">
            <IngredientsPanel burger={burger} dispatch={dispatch} />
            <ItemDetails burger={burger} dispatch={dispatch} />
        </div>
    );
}




function IngredientsPanel({burger, dispatch}: {burger: BurgerType, dispatch: Dispatch}): React.ReactElement {
    const ingredientEmojis = {
        'Meat': '🥩',
        'Lettuce': '🥬', 
        'Cheese': '🧀',
        'Bacon': '🥓'
    };

    const ingredientColors = {
        'Meat': 'from-amber-100 to-amber-200 border-amber-300',
        'Lettuce': 'from-green-100 to-green-200 border-green-300',
        'Cheese': 'from-yellow-100 to-yellow-200 border-yellow-300',
        'Bacon': 'from-red-100 to-red-200 border-red-300'
    };

    return (
        <div className={cardStyles.surface}>
            <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">
                🧄 Ingredients Market
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {burger.ingredients.map((ing) => (
                    <div 
                        key={ing.name} 
                        className={`bg-gradient-to-br ${ingredientColors[ing.name as keyof typeof ingredientColors] || 'from-gray-100 to-gray-200 border-gray-300'} rounded-2xl p-6 shadow-lg border-2 hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-3xl">
                                    {ingredientEmojis[ing.name as keyof typeof ingredientEmojis] || '🍔'}
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold text-amber-900">{ing.name}</h3>
                                    <p className="text-amber-700">${ing.price.toFixed(2)} each</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-amber-900">
                                    ${(ing.price * ing.quantity).toFixed(2)}
                                </div>
                                <div className="text-sm text-amber-600">
                                    Qty: {ing.quantity}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-4">
                            <button 
                                onClick={() => dispatch(removeIngredient({ name: ing.name }))}
                                disabled={ing.quantity === 0}
                                className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-full shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center text-xl font-bold"
                            >
                                −
                            </button>
                            
                            <div className="w-16 h-12 bg-white rounded-xl shadow-inner flex items-center justify-center">
                                <span className="text-2xl font-bold text-amber-900">{ing.quantity}</span>
                            </div>
                            
                            <button 
                                onClick={() => dispatch(addIngredient({ name: ing.name }))}
                                className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center text-xl font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ItemDetails({burger, dispatch}: {burger: BurgerType, dispatch: Dispatch}): React.ReactElement {
    const hasIngredients = burger.ingredients.some(ing => ing.quantity > 0);
    
    return (
        <div className={cardStyles.primary}>
            <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl px-8 py-4 shadow-lg">
                    <div className="text-4xl font-bold mb-1">${burger.totalPrice.toFixed(2)}</div>
                    <div className="text-amber-100">Total Price</div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={() => dispatch(clearIngredients())}
                    disabled={!hasIngredients}
                    className={`${buttonStyles.danger} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                    🗑️ Clear All
                </button>
                
                <Link 
                    to='/checkout'
                    className={`${buttonStyles.primary} text-center ${!hasIngredients ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    🛒 Proceed to Checkout
                </Link>
            </div>

            {!hasIngredients && (
                <div className="text-center mt-6 p-4 bg-amber-100 rounded-xl border-2 border-dashed border-amber-300">
                    <p className="text-amber-700 font-medium">
                        👆 Add some ingredients to build your burger!
                    </p>
                </div>
            )}
        </div>
    );
}