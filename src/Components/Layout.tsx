import { Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import Logo from "../assets/Logo";

export default function Layout() {
  const { user, logout } = useAuth();
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  
  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <button 
        className={`fixed top-4 left-4 z-50 md:hidden bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-xl shadow-lg transition-all duration-300 ${showNav ? "rotate-90" : ""}`} 
        onClick={() => setShowNav(!showNav)}
      >
        <span className="text-2xl">🍔</span>
      </button>

      <nav className={`fixed top-0 left-0 h-screen w-80 flex flex-col bg-gradient-to-b from-amber-100 to-amber-200 backdrop-blur-lg shadow-2xl z-40 transition-transform duration-300 border-r-4 border-amber-300 md:flex-row md:w-full md:h-auto md:bg-gradient-to-r md:from-amber-50 md:to-orange-50 md:backdrop-blur-sm md:shadow-lg md:sticky md:top-0 md:border-r-0 md:border-b-4 ${showNav ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        
        <div className="flex items-center justify-center p-6 md:p-4">
          <Link to='/' className="transform hover:scale-110 transition-transform duration-200"> 
            <div className="flex items-center space-x-3">
              <Logo />
              <span className="text-2xl md:text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                BurgerCraft
              </span>
            </div>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:ml-auto md:items-center gap-2 p-6 md:p-4 mt-auto md:mt-0">
          {user ? (
            <>
              <div className="text-center md:text-left mb-4 md:mb-0 md:mr-6">
                <p className="text-amber-800 font-semibold">Welcome back!</p>
                <p className="text-amber-600 text-sm">{user.name}</p>
              </div>
              
              <Link 
                to='/orders' 
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                  isActiveLink('/orders') 
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                    : 'bg-white/60 text-amber-700 hover:bg-white/80 border border-amber-300'
                }`}
              > 
                📋 Orders 
              </Link>
              
              <Link 
                to='/checkout' 
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                  isActiveLink('/checkout') 
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                    : 'bg-white/60 text-amber-700 hover:bg-white/80 border border-amber-300'
                }`}
              > 
                🛒 Checkout 
              </Link>
              
              <button 
                onClick={logout} 
                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
              > 
                🚪 Logout 
              </button>
            </>
          ) : (
            <Link 
              to='/signin' 
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
            > 
              🔐 Sign In to Order
            </Link>
          )}
        </div>
      </nav>

      <div className={`transition-all duration-300 ${showNav ? "ml-80" : "ml-0"} md:ml-0`}>
        <Outlet />
      </div>

      {showNav && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setShowNav(false)}
        />
      )}
    </div>
  );
}