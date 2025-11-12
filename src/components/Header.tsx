import { FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './Header.css';

const Header: FunctionalComponent = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header class="site-header">
      <nav class="nav-container">
        <a href="/" class="logo">
          Miguel Palau
        </a>
        <ul class="nav-links">
          <li>
            <a href="/posts">Posts</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <button
              class="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '☾' : '☀'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
