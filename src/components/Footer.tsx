import type { FunctionalComponent } from 'preact';
import './Footer.css';

const Footer: FunctionalComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-prompt">
          <span class="prompt">$</span> echo "&copy; {currentYear} Miguel Palau"
        </div>
        <div class="footer-links">
          <a href="https://github.com/shelldandy" target="_blank" rel="noopener noreferrer">github</a>
          <span class="pipe">|</span>
          <a href="https://linkedin.com/in/mpalau" target="_blank" rel="noopener noreferrer">linkedin</a>
          <span class="pipe">|</span>
          <a href="mailto:hola@mpz.im">email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
