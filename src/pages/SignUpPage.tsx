import SignUp from "../Components/SignUp";
import { Link } from "react-router-dom";
import Logo from '../assets/Logo';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo className="w-20 h-20" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
            BurgerCraft
          </h1>
          <p className="text-amber-600 text-lg mt-2">Join the burger revolution!</p>
        </div>

        <SignUp />
        
        <div className="text-center mt-8">
          <p className="text-amber-700">
            Already have an account?{' '}
            <Link 
              to="/signin" 
              className="font-semibold text-amber-600 hover:text-amber-800 underline decoration-2 underline-offset-2 transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}