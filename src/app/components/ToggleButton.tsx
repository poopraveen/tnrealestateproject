import { useTheme } from "../../app/ThemeContext";

import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 bg-gray-300 dark:bg-gray-800 rounded-md"
    >
      {theme === "light" ? <FaMoon className="text-black" /> : <FaSun className="text-white" />}
    </button>
  );
};

export default ThemeToggle;

