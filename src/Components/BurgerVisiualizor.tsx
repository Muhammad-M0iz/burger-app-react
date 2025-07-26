import type { Burger as BurgerType } from "../../types/burger";
import { burgerCssModel } from "../assets/burgerCSS";

export function BurgerVisualization({burger}: {burger: BurgerType}): React.ReactElement {
    const buildBurgerLayers = (ingredients: Array<{name: string, quantity: number}>) => {
        const layers: Array<{type: string, key: string, className: string}> = [];
        ingredients
            .filter(ing => ing.quantity > 0)
            .forEach(ing => {
                for (let i = 0; i < ing.quantity; i++) {
                    layers.push({
                        type: ing.name,
                        key: `${ing.name}-${i}`,
                        className: burgerCssModel[ing.name as keyof typeof burgerCssModel]
                    });
                }
            });
        
        return layers;
    };

    const hasIngredients = burger.ingredients.some(ing => ing.quantity > 0);

    return (
        <div className="flex flex-col items-center">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-800 mb-2">Your Creation</h2>
                <p className="text-amber-600">Watch your burger come to life!</p>
            </div>

            <div className="relative bg-gradient-to-b from-amber-100 to-amber-200 rounded-3xl p-8 shadow-inner border-4 border-amber-300 min-h-[400px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-100">
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-48 h-4 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full shadow-lg mb-4 opacity-80"></div>
                    
                    {hasIngredients ? (
                        <>
                            <div className={`${burgerCssModel.burgerBun} mb-1 transform hover:scale-105 transition-transform duration-200`}>
                                <div className="absolute top-2 left-6 w-1 h-1 bg-amber-900 rounded-full"></div>
                                <div className="absolute top-1 left-10 w-1 h-1 bg-amber-900 rounded-full"></div>
                                <div className="absolute top-2 right-6 w-1 h-1 bg-amber-900 rounded-full"></div>
                                <div className="absolute top-1 right-10 w-1 h-1 bg-amber-900 rounded-full"></div>
                            </div>
                            
                            {buildBurgerLayers(burger.ingredients).map((layer, index) => (
                                <div 
                                    key={layer.key} 
                                    className={`${layer.className} transition-all duration-300 hover:scale-105`}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        zIndex: 100 - index
                                    }}
                                ></div>
                            ))}
                            
                            <div className={`${burgerCssModel.burgerBun} mt-1 transform hover:scale-105 transition-transform duration-200`}></div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🍞</div>
                            <h3 className="text-2xl font-semibold text-amber-700 mb-2">Empty Burger</h3>
                            <p className="text-amber-600">Add some delicious ingredients to start building!</p>
                        </div>
                    )}
                </div>
            </div>

            {hasIngredients && (
                <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-amber-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-amber-800">${burger.totalPrice.toFixed(2)}</div>
                            <div className="text-sm text-amber-600">Total Price</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-amber-800">
                                {burger.ingredients.reduce((sum, ing) => sum + ing.quantity, 0)}
                            </div>
                            <div className="text-sm text-amber-600">Ingredients</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}