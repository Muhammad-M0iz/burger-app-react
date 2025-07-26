import type { Burger as BurgerType } from "../../types/burger";
import { useSelector } from "react-redux";
import type { Order as OrderType } from "../../types/order";
import useLocalStorage from '../../hooks/useLocalStorage'
import type { OrdersStorage } from '../../types/order';
import useAuth from '../../hooks/useAuth';
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { buttonStyles, cardStyles } from "../assets/burgerCSS";
function Checkout() {
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [address, setAddress] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();
  const currentBurger = useSelector((state: { burger: BurgerType }) => state.burger);
  const [orders, setOrders] = useLocalStorage('orders', {} as OrdersStorage);
  const navigate=useNavigate()
  const handlePlaceOrderClick = () => {
    const hasIngredients = currentBurger.ingredients.some(ing => ing.quantity > 0);
    
    if (!hasIngredients) {
      setErrorMessage('Please add some ingredients to your burger before placing an order!');
      setShowErrorPopup(true);
      return;
    }

    if (!user?.email) {
      setErrorMessage('Please sign in to place an order');
      setShowErrorPopup(true);
      return;
    }

    setShowAddressInput(true);
  };

  const confirmOrder = () => {
    if (!address.trim()) {
      setErrorMessage('Please enter your address');
      setShowErrorPopup(true);
      return;
    }

    const newOrder: OrderType = {
      orderId: Math.random().toString(36).substring(2, 15),
      burger: { ...currentBurger },
      totalPrice: currentBurger.totalPrice,
      orderDate: new Date().toISOString().split('T')[0],
      address: address
    };

    const updatedOrders = { ...orders };
    if (!updatedOrders[user!.email]) {
      updatedOrders[user!.email] = [];
    }
    updatedOrders[user!.email].push(newOrder);
    setOrders(updatedOrders);

    setErrorMessage('🎉 Order placed successfully! Your delicious burger is on its way!');
    setShowErrorPopup(true);
    setShowAddressInput(false);
    setAddress('');
    setTimeout(() => {
      navigate('/orders');
    }, 1500);
  };
  return (
    <div className={cardStyles.primary}>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-amber-800 mb-3">🛒 Checkout</h2>
        <p className="text-amber-600 text-lg">Review your order and complete your purchase</p>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-amber-200">
        <h3 className="text-2xl font-semibold text-amber-800 mb-4 flex items-center">
          📝 Order Summary
        </h3>
        
        <div className="space-y-3">
          {currentBurger.ingredients.map((ing) => (
            ing.quantity > 0 && (
              <div key={ing.name} className="flex justify-between items-center py-2 px-4 bg-white/60 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {ing.name === 'Meat' ? '🥩' : 
                     ing.name === 'Lettuce' ? '🥬' : 
                     ing.name === 'Cheese' ? '🧀' : 
                     ing.name === 'Bacon' ? '🥓' : '🍔'}
                  </span>
                  <span className="font-semibold text-amber-900">{ing.name}</span>
                  <span className="text-amber-600">x{ing.quantity}</span>
                </div>
                <span className="font-bold text-amber-800">${(ing.price * ing.quantity).toFixed(2)}</span>
              </div>
            )
          ))}
        </div>


        <div className="mt-6 pt-4 border-t-2 border-amber-300">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-amber-800">Total:</span>
            <span className="text-3xl font-bold text-amber-800">${currentBurger.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {!showAddressInput ? (
        <div className="text-center">
          <button
            onClick={handlePlaceOrderClick}
            disabled={!currentBurger.ingredients.some(ing => ing.quantity > 0)}
            className={`${buttonStyles.primary} text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {user ? "🚀 Place Order" : <Link to="/signin" className="text-white">🔐 Sign In to Place Order</Link>}
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
          <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
            📍 Delivery Address
          </h3>
          
          <label htmlFor="address" className="block">
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your complete delivery address..."
              className="w-full p-4 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-lg"
              required
            />
          </label>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={confirmOrder}
              className={`${buttonStyles.success} flex-1 text-lg`}
            >
              ✅ Confirm Order
            </button>
            <button
              onClick={() => setShowAddressInput(false)}
              className={`${buttonStyles.outline} flex-1`}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      {showErrorPopup && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowErrorPopup(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-6 text-center ${errorMessage.includes('successfully') ? 'bg-gradient-to-br from-green-50 to-emerald-50' : 'bg-gradient-to-br from-red-50 to-pink-50'}`}>
              <div className="text-6xl mb-4">
                {errorMessage.includes('successfully') ? '🎉' : '⚠️'}
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${errorMessage.includes('successfully') ? 'text-green-800' : 'text-red-800'}`}>
                {errorMessage.includes('successfully') ? 'Success!' : 'Oops!'}
              </h3>
              <p className={`text-lg mb-6 ${errorMessage.includes('successfully') ? 'text-green-700' : 'text-red-700'}`}>
                {errorMessage}
              </p>
              <button
                onClick={() => setShowErrorPopup(false)}
                className={errorMessage.includes('successfully') ? buttonStyles.success : buttonStyles.primary}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout