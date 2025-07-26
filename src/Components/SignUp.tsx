import { useFormik } from "formik"
import { signUpSchema } from "../schemas";
import useLocalStorage from "../../hooks/useLocalStorage"
import type { User } from "../../types/user"
import { useNavigate } from "react-router-dom";
import { buttonStyles, cardStyles } from "../assets/burgerCSS";
import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function SignUp() {
    const [storedUsers, , addUser] = useLocalStorage('users', []);
    const [, setCurrentUser] = useLocalStorage('currentUser', null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    setErrors,
    resetForm,
    }=useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit:({name,email,password})=>{
       const id= Math.random().toString(36).substring(2, 15);
       const user = { id, name, email, password };
      if(storedUsers?.some((existingUser: User) => existingUser.email === email)) {
        setErrors({ email: "User with this email already exists" });
        setMessage("❌ An account with this email already exists. Please try signing in instead.");
        setShowErrorPopup(true);
      } else {
        addUser(user);
        resetForm();
        setCurrentUser(user);
        setMessage("🎉 Welcome to BurgerCraft! Your account has been created successfully!");
        setShowSuccessPopup(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }
  });
  
  return (
    <div className={cardStyles.primary}>
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">👋</div>
        <h2 className="text-4xl font-bold text-amber-800 mb-3">Join BurgerCraft!</h2>
        <p className="text-amber-600 text-lg">Create your account to start building amazing burgers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-amber-800 font-semibold mb-2 text-lg">
            👤 Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-4 border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 text-lg"
          />
          {errors.name && touched.name && (
            <div className="text-red-600 mt-2 font-semibold flex items-center">
              ⚠️ {errors.name}
            </div>
          )}
        </div>

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
            placeholder="Create a secure password"
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

        <div>
          <label htmlFor="confirmPassword" className="block text-amber-800 font-semibold mb-2 text-lg">
            🔐 Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-4 border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 text-lg"
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <div className="text-red-600 mt-2 font-semibold flex items-center">
              ⚠️ {errors.confirmPassword}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className={`${buttonStyles.primary} w-full text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isSubmitting ? "🔄 Creating Account..." : "🚀 Create Account"}
        </button>
      </form>

      {/* Success Popup */}
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
              <h3 className="text-2xl font-bold mb-3 text-green-800">Welcome Aboard!</h3>
              <p className="text-lg mb-6 text-green-700">{message}</p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className={buttonStyles.success}
              >
                Let's Start Building!
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

export default SignUp