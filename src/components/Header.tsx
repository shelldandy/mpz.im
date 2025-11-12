import type { FunctionalComponent } from 'preact';
import DarkModeToggle from './DarkModeToggle';
import './Header.css';

const Header: FunctionalComponent = () => {
  return (
    <header class="site-header">
      <nav class="nav-container">
        <a href="/" class="logo">
          Miguel Palau
        </a>
        <div class="nav-right">
          <ul class="nav-links">
            <li>
              <a href="/posts">Posts</a>
            </li>
            <li>
              <a href="/resume">Resume</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
