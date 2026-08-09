import type { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import DarkModeToggle from './DarkModeToggle';
import './Header.css';

const Header: FunctionalComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e: MouseEvent) => {
    setIsMenuOpen(!isMenuOpen);
    (e.currentTarget as HTMLButtonElement)?.blur();
  };

  return (
    <header class="site-header">
      <nav class="nav-container">
        <a href="/" class="header-left" aria-label="Home">
          <div class="window-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="terminal-title">miguel@mpz.im:~</span>
        </a>
        <div class="nav-right">
          <ul class={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            <li>
              <a href="/posts" onClick={() => setIsMenuOpen(false)}>$ posts</a>
            </li>
            <li>
              <a href="/resume" onClick={() => setIsMenuOpen(false)}>$ resume</a>
            </li>
            <li>
              <a href="/contact" onClick={() => setIsMenuOpen(false)}>$ contact</a>
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
