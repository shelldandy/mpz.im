import type { FunctionalComponent } from 'preact';
import './Hero.css';

interface HeroProps {
  imageUrl: string;
  title: string;
  cta?: {
    label: string;
    link: string;
  };
}

const Hero: FunctionalComponent<HeroProps> = ({ imageUrl, title, cta }) => {
  return (
    <div class="hero-section">
      <div class="hero-image" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div class="hero-overlay">
          <div class="hero-content">
            <h1 class="hero-title">{title}</h1>
            {cta && (
              <a href={`/${cta.link}`} class="hero-cta">
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
