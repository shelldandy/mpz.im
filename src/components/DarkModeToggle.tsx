import type { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './DarkModeToggle.css';

const DarkModeToggle: FunctionalComponent = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // SSR compatibility check
    if (typeof window === 'undefined') return;

    // Check localStorage and system preference on mount
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const themeValue = newTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeValue);
    localStorage.setItem('theme', themeValue);
  };

  return (
    <button
      class="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      {isDark ? '☀' : '☾'}
    </button>
  );
};

export default DarkModeToggle;
