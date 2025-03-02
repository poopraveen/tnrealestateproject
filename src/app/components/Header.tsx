'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaBell, FaHome, FaUserPlus, FaFileAlt, FaUserCircle, FaBuilding, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ToggleButton';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Dummy user name (Replace this with actual user data)
  const username = "John Doe";
  const userInitials = username.slice(0, 2).toUpperCase(); // Extract first two letters

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Close modal if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close the menu after item click
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
      {/* Hamburger Menu Button */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-white p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* User Info and Notification */}
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full text-white font-bold">
          {userInitials}
        </div>
        <Link href={`/taskList/advisorID`} className="flex items-center gap-3">
          <div className="relative">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-2 py-1">3</span>
          </div>
        </Link>
      </div>

      {/* Mobile Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40 flex justify-center items-center">
          <div
            ref={menuRef}
            className="relative bg-gray-800 p-8 rounded-lg w-3/4 h-3/4 max-w-3xl shadow-lg flex flex-col justify-between"
          >
            {/* Close Button */}
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-3xl">
              &times;
            </button>

            {/* Menu List */}
            <ul className="space-y-6 text-white text-lg">
              <li>
                <Link href="/" onClick={handleMenuItemClick} className="flex items-center gap-3">
                  <FaHome className="text-xl" /> {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/customerlist" onClick={handleMenuItemClick} className="flex items-center gap-3">
                  <FaUserPlus className="text-xl" /> {t('Profile')}
                </Link>
              </li>
              <li>
                <Link href="/Dashboard" onClick={handleMenuItemClick} className="flex items-center gap-3">
                  <FaFileAlt className="text-xl" /> {t('Dashboard')}
                </Link>
              </li>
              <li>
                <Link href="/profile" onClick={handleMenuItemClick} className="flex items-center gap-3">
                  <FaUserCircle className="text-xl" /> {t('Add Profile')}
                </Link>
              </li>
              <li>
                <Link href="/ProjectList" onClick={handleMenuItemClick} className="flex items-center gap-3">
                  <FaBuilding className="text-xl" /> {t('Projects')}
                </Link>
              </li>
            </ul>

            {/* Language Switcher */}
            <div className="mt-6 text-center">
              <p className="text-white text-lg mb-3 flex items-center justify-center gap-2">
                <FaGlobe /> {t('language')}
              </p>
              <div className="flex justify-center space-x-4">
                {[{ lang: 'en', label: 'English', flag: '🇬🇧' }, { lang: 'ta', label: 'தமிழ்', flag: '🇮🇳' }].map(
                  ({ lang, label, flag }) => (
                    <button
                      key={lang}
                      onClick={() => {
                        changeLanguage(lang);
                        handleMenuItemClick(); // Close the menu after language change
                      }}
                      className={`px-5 py-2 rounded-lg flex items-center gap-2 font-medium border-2 transition-all 
            ${i18n.language === lang ? 'bg-teal-500 text-white border-teal-600 shadow-lg' : 'bg-gray-700 text-gray-300 border-gray-500 hover:bg-gray-600 hover:text-white'}`}
                    >
                      {flag} {label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="mt-6 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
