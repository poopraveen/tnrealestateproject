import Link from "next/link";
import { FaHome, FaUserPlus, FaFileAlt, FaUserCircle, FaBuilding } from "react-icons/fa"; // React Icons

const Footer = () => {
  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      {/* Footer Section */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 p-4 flex justify-around border-t border-gray-300 shadow-md">
        {[ 
          { href: "/", icon: <FaHome className="text-xl" />, label: "Home" },
          { href: "/customerlist", icon: <FaUserPlus className="text-xl" />, label: "Profile" },
          { href: "/Dashboard", icon: <FaFileAlt className="text-xl" />, label: "Dashboard" },
          { href: "/profile", icon: <FaUserCircle className="text-xl" />, label: "Add Profile" },
          { href: "/ProjectList", icon: <FaBuilding className="text-xl" />, label: "Projects" },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-gray-800 dark:text-white text-xl transition-transform duration-300 transform hover:-translate-y-1 hover:scale-110"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
