'use client';

import { useRouter } from 'next/router';
import HamburgerMenu from './HamburgerMenu';  // Import the HamburgerMenu component

const Footer = () => {
  const router = useRouter();

  // Navigation functions
  const navigateToDashboard = () => {
    router.push('/Dashboard');
  };

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <div>
      {/* Render the Hamburger Menu Component */}
      <HamburgerMenu />

      {/* Bottom Navigation Menu */}
      <div className="bg-gray-800 fixed bottom-0 left-0 right-0 shadow-lg flex justify-around items-center p-4">
        <button onClick={navigateToDashboard} className="text-white hover:text-blue-500">
          <span className="block text-xs">Home</span>
        </button>
        <button onClick={navigateHome} className="text-white hover:text-blue-500">
          <span className="block text-xs">Search</span>
        </button>
        <button onClick={navigateToDashboard} className="text-white hover:text-blue-500">
          <span className="block text-xs">Notifications</span>
        </button>
        <button onClick={navigateHome} className="text-white hover:text-blue-500">
          <span className="block text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;
