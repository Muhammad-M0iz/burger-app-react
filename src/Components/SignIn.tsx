import { useFormik } from "formik"
import { signInSchema } from "../schemas";
import useLocalStorage from "../../hooks/useLocalStorage"
import type { User } from "../../types/user"
import { useNavigate } from "react-router-dom";
import { buttonStyles, cardStyles } from "../assets/burgerCSS";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
}

export default function SignIn() {
    const navigate = useNavigate();
    const [users] = useLocalStorage('users', []);
    const [, setCurrentUser] = useLocalStorage('currentUser', null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [message, setMessage] = useState('');
    
    const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    }=useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit:({email,password})=>{
        const user = users?.find((user: User) => user.email === email && user.password === password);
        if (user) {
          console.log("User signed in:", user);
          setCurrentUser(user);
          setMessage("🎉 Welcome back! You're successfully signed in!");
          setShowSuccessPopup(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          console.log("Invalid email or password");
          setMessage("❌ Invalid email or password. Please try again.");
          setShowErrorPopup(true);
        }
    }
    })

  return (
    <div className={cardStyles.primary}>
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔐</div>
        <h2 className="text-4xl font-bold text-amber-800 mb-3">Welcome Back!</h2>
        <p className="text-amber-600 text-lg">Sign in to continue building amazing burgers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-amber-800 font-semibold mb-2 text-lg">
            📧 Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-4 border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 text-lg"
          />
          {errors.email && touched.email && (
            <div className="text-red-600 mt-2 font-semibold flex items-center">
              ⚠️ {errors.email}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-amber-800 font-semibold mb-2 text-lg">
            🔒 Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-4 border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 text-lg"
          />
          {errors.password && touched.password && (
            <div className="text-red-600 mt-2 font-semibold flex items-center">
              ⚠️ {errors.password}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className={`${buttonStyles.primary} w-full text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isSubmitting ? "🔄 Signing In..." : "🚀 Sign In"}
        </button>
      </form>

      {showSuccessPopup && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-3 text-green-800">Success!</h3>
              <p className="text-lg mb-6 text-green-700">{message}</p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className={buttonStyles.success}
              >
                Awesome!
              </button>
            </div>
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
            <div className="p-6 text-center bg-gradient-to-br from-red-50 to-pink-50">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold mb-3 text-red-800">Oops!</h3>
              <p className="text-lg mb-6 text-red-700">{message}</p>
              <button
                onClick={() => setShowErrorPopup(false)}
                className={buttonStyles.primary}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

