// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBell } from 'react-icons/fa'; // For the notification bell icon

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center relative sticky top-0 z-50 shadow-md">
      {/* Hamburger Menu Button */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-white p-2">
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* User Info and Notification */}
      <div className="flex items-center space-x-4">
        <Link href="/profile" className="text-xl">
          <span>Username</span> {/* You can dynamically show the user's name here */}
        </Link>
        <div className="relative">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-2 py-1">3</span> {/* Notification count */}
        </div>
      </div>

      {/* Hamburger Menu - Mobile View */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-64">
            <button
              onClick={toggleMenu}
              className="text-white text-3xl absolute top-4 right-4"
            >
              &times; {/* Close button */}
            </button>
            <ul className="space-y-4 text-center text-white">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/maps">Search</Link>
              </li>
              <li>
                <Link href="/Dashboard">Notifications</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
