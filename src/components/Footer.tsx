import type { FunctionalComponent } from 'preact';
import './Footer.css';

const Footer: FunctionalComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-links">
          <a href="https://github.com/shelldandy" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span class="dot">&middot;</span>
          <a href="https://linkedin.com/in/mpalau" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span class="dot">&middot;</span>
          <a href="mailto:hola@mpz.im">hola@mpz.im</a>
        </div>
        <p class="footer-year">{currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
