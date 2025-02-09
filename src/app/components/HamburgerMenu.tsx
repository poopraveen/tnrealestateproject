// src/components/HamburgerMenu.tsx
'use client';  // Ensure this is at the top of your file

import { useState } from 'react';

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          className="text-white p-2"
          onClick={toggleMenu}
        >
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

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40">
          <div className="flex justify-end p-4">
            <button
              className="text-white text-3xl"
              onClick={toggleMenu}
            >
              &times; {/* Close button */}
            </button>
          </div>

          <div className="flex justify-center items-center h-full">
            <div className="bg-gray-800 p-6 rounded-lg w-64">
              <ul className="space-y-4 text-center text-white">
                <li>
                  <a href="#" className="block text-xl">Home</a>
                </li>
                <li>
                  <a href="#" className="block text-xl">Search</a>
                </li>
                <li>
                  <a href="#" className="block text-xl">Notifications</a>
                </li>
                <li>
                  <a href="#" className="block text-xl">Profile</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
