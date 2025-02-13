import Link from "next/link";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-around border-t border-gray-300 shadow-md">
      {[
        { href: "/", icon: "🏠", label: "Home" },
        { href: "/customerlist", icon: "👤", label: "Profile" },
        { href: "/Dashboard", icon: "📄", label: "Dashboard" },
        { href: "/maps", icon: "📍", label: "Maps" },
        { href: "/profile", icon: "⚙️", label: "Settings" },
      ].map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="text-gray-800 text-xl transition-transform duration-300 transform hover:-translate-y-1 hover:scale-110"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Footer;
