import useAuth from "../../hooks/useAuth";
import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { buttonStyles } from "../assets/burgerCSS";

export default function Auth({children}: {children: ReactNode}) {
    const {user} = useAuth();

    return(
        <>
            {user ? children : 
                <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-200 p-12 text-center max-w-md w-full">
                        <div className="text-8xl mb-6">🔐</div>
                        <h1 className="text-3xl font-bold text-amber-800 mb-4">
                            Authentication Required
                        </h1>
                        <p className="text-amber-600 text-lg mb-8">
                            Please sign in to access this delicious content and start building your perfect burger!
                        </p>
                        <Link 
                            to="/signin" 
                            className={`${buttonStyles.primary} text-xl inline-block`}
                        >
                            🚀 Sign In Now
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}