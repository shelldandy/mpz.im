import type { FunctionalComponent } from 'preact';
import './Footer.css';

const Footer: FunctionalComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="site-footer">
      <div class="footer-container">
        <p>&copy; {currentYear} Miguel Palau. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
