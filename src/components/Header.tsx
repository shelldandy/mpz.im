import type { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import DarkModeToggle from './DarkModeToggle';
import './Header.css';

const Header: FunctionalComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e: MouseEvent) => {
    setIsMenuOpen(!isMenuOpen);

    // Remove focus on mobile to prevent sticky active state
    (e.currentTarget as HTMLButtonElement)?.blur();
  };

  return (
    <header class="site-header">
      <nav class="nav-container">
        <a href="/" class="logo">
          Miguel Palau
        </a>
        <div class="nav-right">
          <ul class={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            <li>
              <a href="/posts" onClick={() => setIsMenuOpen(false)}>Posts</a>
            </li>
            <li>
              <a href="/resume" onClick={() => setIsMenuOpen(false)}>Resume</a>
            </li>
            <li>
              <a href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </li>
          </ul>
          <div class="nav-controls">
            <button
              class="hamburger-menu"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              type="button"
            >
              <span class={`hamburger-icon ${isMenuOpen ? 'hamburger-icon-open' : ''}`}></span>
            </button>
            <DarkModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
