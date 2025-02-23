'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBell } from 'react-icons/fa';
import ThemeToggle from './ToggleButton';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center relative sticky top-0 z-50 shadow-md">
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

      {/* Language Switcher */}
      <div className="flex items-center space-x-4">
        <button onClick={() => changeLanguage('en')} className="px-2 py-1 bg-gray-700 rounded">
          🇬🇧 {t('english')}
        </button>
        <button onClick={() => changeLanguage('ta')} className="px-2 py-1 bg-gray-700 rounded">
          🇮🇳 {t('tamil')}
        </button>
      </div>

      {/* User Info and Notification */}
      <div className="flex items-center space-x-4">
        <Link href="/profile" className="text-xl">
          <span>{t('username')}</span>
        </Link>
        <div className="relative">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-2 py-1">3</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-64">
            <button onClick={toggleMenu} className="text-white text-3xl absolute top-4 right-4">
              &times;
            </button>
            <ul className="space-y-4 text-center text-white">
              <li><Link href="/">{t('home')}</Link></li>
              <li><Link href="/maps">{t('search')}</Link></li>
              <li><Link href="/Dashboard">{t('notifications')}</Link></li>
              <li><Link href="/profile">{t('profile')}</Link></li>
              <li><ThemeToggle /></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
