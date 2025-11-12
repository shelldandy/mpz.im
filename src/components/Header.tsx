import type { FunctionalComponent } from 'preact';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header: FunctionalComponent = () => {
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
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
