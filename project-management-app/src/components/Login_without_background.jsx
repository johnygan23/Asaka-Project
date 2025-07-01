// import { useState } from 'react';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const [errors, setErrors] = useState({});
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));

//         // Clear errors when user starts typing after submission
//         if (isSubmitted && errors[name]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: ''
//             }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         // Email validation
//         if (!formData.email) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Please enter a valid email address';
//         }

//         // Password validation
//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         } else if (formData.password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters long';
//         }

//         return newErrors;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsSubmitted(true);

//         const formErrors = validateForm();
//         setErrors(formErrors);

//         // If no errors, proceed with login
//         if (Object.keys(formErrors).length === 0) {
//             console.log('Login attempt:', formData);
//             // Handle successful login logic here
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-5 font-sans">
//             <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md border border-gray-200">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
//                     <p className="text-gray-500 text-sm">Please sign in to your account to continue</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//                     <div className="flex flex-col gap-1.5">
//                         <label htmlFor="email" className="text-sm font-medium text-gray-700">
//                             Email Address
//                         </label>
//                         <input
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Enter your email address"
//                             className={`px-4 py-3 border-2 rounded-lg text-sm transition-all duration-200 bg-gray-50 focus:outline-none focus:bg-white placeholder-gray-400 ${isSubmitted && errors.email
//                                 ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
//                                 : 'border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100'
//                                 }`}
//                         />
//                         {isSubmitted && errors.email && (
//                             <span className="text-red-500 text-xs mt-1">{errors.email}</span>
//                         )}
//                     </div>

//                     <div className="flex flex-col gap-1.5">
//                         <label htmlFor="password" className="text-sm font-medium text-gray-700">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Enter your password"
//                             className={`px-4 py-3 border-2 rounded-lg text-sm transition-all duration-200 bg-gray-50 focus:outline-none focus:bg-white placeholder-gray-400 ${isSubmitted && errors.password
//                                 ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
//                                 : 'border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100'
//                                 }`}
//                         />
//                         {isSubmitted && errors.password && (
//                             <span className="text-red-500 text-xs mt-1">{errors.password}</span>
//                         )}
//                     </div>

//                     <div className="flex justify-between items-center my-2">
//                         <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
//                             <input
//                                 type="checkbox"
//                                 className="w-4 h-4 accent-cyan-400"
//                             />
//                             <span>Remember me</span>
//                         </label>
//                         <a href="#" className="text-sm text-cyan-400 font-medium hover:text-cyan-600 hover:underline">
//                             Forgot password?
//                         </a>
//                     </div>

//                     <button
//                         type="submit"
//                         className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-white border-none py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 mt-2 hover:from-cyan-600 hover:to-cyan-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/30 active:translate-y-0"
//                     >
//                         Sign In
//                     </button>
//                 </form>

//                 <div className="text-center mt-6 pt-6 border-t border-gray-200">
//                     <p className="text-sm text-gray-500">
//                         Don't have an account?
//                         <a href="#" className="text-cyan-400 font-medium hover:text-cyan-600 hover:underline ml-1">
//                             Sign up now
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;