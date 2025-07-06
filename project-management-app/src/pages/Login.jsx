import { useState } from "react";
import AsanaLogo from "../assets/asana-logo.svg";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        // role: ''
    });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing after submission
    if (isSubmitted && errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

        // Role validation
        // if (!formData.role) {
        //     newErrors.role = 'Please select your role';
        // }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const formErrors = validateForm();
    setErrors(formErrors);

        // If no errors, proceed with login
        if (Object.keys(formErrors).length === 0) {
            console.log('Login attempt:', formData);
            // Handle successful login logic here
            if (onLogin) {
                onLogin(formData);
            }
        }
    };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 font-sans">
      {/* Brand Logo - Top Left */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <img src={AsanaLogo} alt="Asaka Logo" className="w-10 h-10" />
        <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
          Asaka
        </h2>
      </div>

      {/* Abstract curved background elements */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f9fafb" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f3f4f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Large curved shape 1 */}
        <path
          d="M-50,200 Q200,50 400,200 T800,300 Q900,350 1050,200 L1050,600 Q800,400 600,500 T200,600 Q100,650 -50,500 Z"
          fill="url(#grad1)"
        />

        {/* Large curved shape 2 */}
        <path
          d="M-50,600 Q150,450 350,550 T700,650 Q850,700 1050,600 L1050,1050 L-50,1050 Z"
          fill="url(#grad2)"
        />

        {/* Accent curved shape with cyan tones */}
        <path
          d="M-50,300 Q250,200 450,350 T850,400 Q950,450 1050,350 L1050,500 Q800,350 600,450 T200,500 Q100,550 -50,400 Z"
          fill="url(#grad3)"
        />

        {/* Curved lines */}
        <path
          d="M100,100 Q300,50 500,150 T900,200"
          stroke="#d1d5db"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />

        <path
          d="M50,300 Q250,200 450,350 T850,400"
          stroke="#e5e7eb"
          strokeWidth="3"
          fill="none"
          opacity="0.8"
        />

        <path
          d="M200,500 Q400,400 600,550 T1000,600"
          stroke="#f3f4f6"
          strokeWidth="4"
          fill="none"
          opacity="0.7"
        />

        {/* Subtle cyan accent lines */}
        <path
          d="M150,250 Q350,200 550,300 T950,350"
          stroke="#22d3ee"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />

        {/* Small decorative circles */}
        <circle cx="150" cy="150" r="8" fill="#e5e7eb" opacity="0.5" />
        <circle cx="750" cy="250" r="12" fill="#d1d5db" opacity="0.4" />
        <circle cx="300" cy="400" r="6" fill="#22d3ee" opacity="0.3" />
        <circle cx="850" cy="500" r="10" fill="#e5e7eb" opacity="0.3" />
        <circle cx="600" cy="300" r="4" fill="#0891b2" opacity="0.4" />

        {/* Additional curved elements */}
        <path
          d="M-50,0 Q200,100 400,50 T800,150 L800,0 Z"
          fill="#f9fafb"
          opacity="0.5"
        />
      </svg>

      {/* Floating abstract shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-30 blur-sm"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-tr from-cyan-100 to-cyan-200 rounded-full opacity-40 blur-sm"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-bl from-gray-200 to-gray-300 rounded-full opacity-25 blur-sm"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-tr from-cyan-50 to-cyan-100 rounded-full opacity-35 blur-sm"></div>

      {/* Login Form - Main content area with relative z-index */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-5">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-10 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Please sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`px-4 py-3 border-2 rounded-lg text-sm transition-all duration-200 bg-white/80 focus:outline-none focus:bg-white placeholder-gray-400 ${
                  isSubmitted && errors.email
                    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                }`}
              />
              {isSubmitted && errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email}
                </span>
              )}
            </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`px-4 py-3 border-2 rounded-lg text-sm transition-all duration-200 bg-white/80 focus:outline-none focus:bg-white placeholder-gray-400 ${isSubmitted && errors.password
                                    ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                    : 'border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100'
                                    }`}
                            />
                            {isSubmitted && errors.password && (
                                <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                            )}
                        </div>

            <div className="flex justify-between items-center my-2">
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-cyan-400" />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-cyan-400 font-medium hover:text-cyan-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-white border-none py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 mt-2 hover:from-cyan-600 hover:to-cyan-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/30 active:translate-y-0"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Don't have an account?
              <Link
                to="/signup"
                className="text-cyan-400 font-medium hover:text-cyan-600 hover:underline ml-1"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
