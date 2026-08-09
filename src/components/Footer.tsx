import type { FunctionalComponent } from 'preact';
import './Footer.css';

const Footer: FunctionalComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-col">
            <p class="footer-name">Miguel Palau</p>
            <p class="footer-tagline">Senior Fullstack Engineer</p>
          </div>
          <div class="footer-col">
            <p class="footer-heading">Navigation</p>
            <a href="/posts">Posts</a>
            <a href="/resume">Resume</a>
            <a href="/contact">Contact</a>
          </div>
          <div class="footer-col">
            <p class="footer-heading">Connect</p>
            <a href="https://github.com/shelldandy" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/mpalau" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:hola@mpz.im">Email</a>
          </div>
          <div class="footer-col">
            <p class="footer-heading">Built with</p>
            <span>Astro</span>
            <span>Preact</span>
            <span>Netlify</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {currentYear} Miguel Palau</p>
      </div>
    </footer>
  );
};

export default Footer;
