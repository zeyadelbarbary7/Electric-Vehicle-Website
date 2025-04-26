import React, { useState, useEffect } from 'react';
import { Menu, X, User, MapPin, Clock, HelpCircle, Moon, Sun } from 'lucide-react';
import Logo from '../common/Logo';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900 shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo variant="full" size="md" color={isScrolled || darkMode ? 'dark' : 'light'} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className={`font-medium transition-colors ${
                isScrolled || darkMode
                  ? 'text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400'
                  : 'text-white hover:text-green-400'
              }`}
            >
              Find a Van
            </a>
            <a
              href="#"
              className={`font-medium transition-colors ${
                isScrolled || darkMode
                  ? 'text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400'
                  : 'text-white hover:text-green-400'
              }`}
            >
              How It Works
            </a>
            <a
              href="#"
              className={`font-medium transition-colors ${
                isScrolled || darkMode
                  ? 'text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400'
                  : 'text-white hover:text-green-400'
              }`}
            >
              Pricing
            </a>
            <a
              href="#"
              className={`font-medium transition-colors ${
                isScrolled || darkMode
                  ? 'text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400'
                  : 'text-white hover:text-green-400'
              }`}
            >
              Support
            </a>
            <button 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className={isScrolled ? 'text-gray-700' : 'text-white'} />
              )}
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Log In
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className={isScrolled ? 'text-gray-700' : 'text-white'} />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${
                isScrolled || darkMode
                  ? 'text-gray-700 dark:text-gray-200'
                  : 'text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-16">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <a
              href="#"
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium py-2"
              onClick={toggleMenu}
            >
              <MapPin size={20} className="mr-3" />
              Find a Van
            </a>
            <a
              href="#"
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium py-2"
              onClick={toggleMenu}
            >
              <Clock size={20} className="mr-3" />
              How It Works
            </a>
            <a
              href="#"
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium py-2"
              onClick={toggleMenu}
            >
              <HelpCircle size={20} className="mr-3" />
              Support
            </a>
            <a
              href="#"
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium py-2"
              onClick={toggleMenu}
            >
              <User size={20} className="mr-3" />
              Log In
            </a>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-4"
            >
              Book a Charge
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;