import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-gray-800 fixed bottom-0 left-0 right-0 shadow-lg flex justify-around items-center p-4">
      <Link href="/Dashboard" className="text-white hover:text-blue-500 text-xs">
        Home
      </Link>
      <Link href="/" className="text-white hover:text-blue-500 text-xs">
        Search
      </Link>
      <Link href="/Dashboard" className="text-white hover:text-blue-500 text-xs">
        Notifications
      </Link>
      <Link href="/profile" className="text-white hover:text-blue-500 text-xs">
        Profile
      </Link>
    </div>
  );
};

export default Footer;
