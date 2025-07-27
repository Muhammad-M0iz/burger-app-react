import useAuth from '../../hooks/useAuth';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Order as OrderType, OrdersStorage } from '../../types/order';
import { buttonStyles, cardStyles } from "../assets/burgerCSS";
import { Link } from "react-router-dom";

function Order() {
    const { user } = useAuth();
    const [orders] = useLocalStorage('orders', {} as OrdersStorage);
    
    const userOrders: OrderType[] = user?.email ? orders[user.email] || [] : [];

    if (!user) {
        return (
            <div className={cardStyles.primary}>
                <div className="text-center">
                    <div className="text-8xl mb-6">🔐</div>
                    <h2 className="text-4xl font-bold text-amber-800 mb-4">Order History</h2>
                    <p className="text-amber-600 text-lg mb-8">Please sign in to view your order history.</p>
                    <Link to="/signin" className={buttonStyles.primary}>
                        🚀 Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={cardStyles.primary}>
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-amber-800 mb-3">📋 Order History</h2>
                <p className="text-amber-600 text-lg">Track all your delicious burger orders</p>
            </div>

            {userOrders.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-8xl mb-6">🍔</div>
                    <h3 className="text-2xl font-semibold text-amber-800 mb-4">No Orders Yet</h3>
                    <p className="text-amber-600 text-lg mb-8">You haven't placed any orders yet. Start building your perfect burger!</p>
                    <Link to="/" className={buttonStyles.primary}>
                        🚀 Build Your First Burger
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {userOrders.map((order: OrderType) => (
                        <div key={order.orderId} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 pb-4 border-b-2 border-amber-200">
                                <div>
                                    <h4 className="text-xl font-bold text-amber-800 flex items-center">
                                        📦 Order #{order.orderId.slice(-8).toUpperCase()}
                                    </h4>
                                    <p className="text-amber-600 flex items-center mt-1">
                                        📅 {new Date(order.orderDate).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                    <span className="text-2xl font-bold text-amber-800">
                                        💰 ${order.totalPrice?.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            
                            {order.address && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                                    <p className="text-blue-800 font-semibold flex items-center">
                                        📍 Delivery Address: <span className="ml-2 font-normal">{order.address}</span>
                                    </p>
                                </div>
                            )}

                            <div>
                                <h5 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
                                    🍔 Burger Ingredients:
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {order.burger?.ingredients
                                        ?.filter(ing => ing.quantity > 0)
                                        ?.map((ingredient, index: number) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xl">
                                                        {ingredient.name === 'Meat' ? '🥩' : 
                                                         ingredient.name === 'Lettuce' ? '🥬' : 
                                                         ingredient.name === 'Cheese' ? '🧀' : 
                                                         ingredient.name === 'Bacon' ? '🥓' : '🍔'}
                                                    </span>
                                                    <span className="font-semibold text-amber-900">{ingredient.name}</span>
                                                    <span className="text-amber-600">x{ingredient.quantity}</span>
                                                </div>
                                                <span className="font-bold text-amber-800">
                                                    ${(ingredient.quantity * ingredient.price)?.toFixed(2)}
                                                </span>
                                            </div>
                                        )) || (
                                            <div className="col-span-2 text-center py-4 text-amber-600">
                                                No ingredients found
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Order
