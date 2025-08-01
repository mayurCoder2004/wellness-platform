import { useState } from 'react';
import axios from '../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, Sparkles } from 'lucide-react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400 rounded-full opacity-5 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to access your wellness journey</p>
        </div>

        {/* Login Form - Your original form with enhanced styling */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm"
        >
          <div className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={form.email}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={form.password}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </div>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to={'/register'} className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-300">
                Sign up here
              </Link>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;