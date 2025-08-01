import { Link, useNavigate } from 'react-router-dom';
import { Activity, Home, User, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WellnessHub
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="group flex items-center px-4 py-2 rounded-xl text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 relative overflow-hidden"
            >
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Dashboard
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            {token && (
              <Link 
                to="/my-sessions" 
                className="group flex items-center px-4 py-2 rounded-xl text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 relative overflow-hidden"
              >
                <User className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                My Sessions
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {token ? (
              <button
                onClick={handleLogout}
                className="group flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="group flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <LogIn className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="group flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <UserPlus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mt-2 border border-blue-100">
            {/* Mobile Brand */}
            <div className="px-3 py-2 mb-3">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WellnessHub
              </h2>
            </div>

            {/* Mobile Navigation Links */}
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-3 py-3 rounded-xl text-gray-700 font-medium hover:text-blue-600 hover:bg-white transition-all duration-200"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            {token && (
              <Link 
                to="/my-sessions" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-3 rounded-xl text-gray-700 font-medium hover:text-blue-600 hover:bg-white transition-all duration-200"
              >
                <User className="w-5 h-5 mr-3" />
                My Sessions
              </Link>
            )}

            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t border-blue-200">
              {token ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;