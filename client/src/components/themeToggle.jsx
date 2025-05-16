import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="h-7">
      {theme === "light" ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
    </button>
  );
}

export default ThemeToggle;
