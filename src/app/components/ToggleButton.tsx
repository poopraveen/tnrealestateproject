import { useTheme } from "../../app/ThemeContext";
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-16 h-8 bg-gray-700 dark:bg-gray-300 rounded-full flex items-center transition-all duration-300 p-1"
    >
      <div
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transition-all transform ${
          theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
      <Sun className="absolute left-2 text-yellow-400 dark:text-gray-400 transition-all" size={16} />
      <Moon className="absolute right-2 text-gray-400 dark:text-blue-300 transition-all" size={16} />
    </button>
  );
};

export default ThemeToggle;

