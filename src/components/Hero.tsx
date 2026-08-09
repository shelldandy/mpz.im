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

const Hero: FunctionalComponent<HeroProps> = () => {
  return (
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-name">
            <span>MIGUEL</span>
            <span>PALAU</span>
            <span class="hero-role">.engineer()</span>
          </h1>
          <p class="hero-subtitle">Building digital products for 10+ years.</p>
          <div class="hero-ctas">
            <a href="/resume" class="btn btn-gradient">See My Work</a>
            <a href="/contact" class="btn btn-ghost">Say Hello</a>
          </div>
        </div>
        <div class="hero-decoration" aria-hidden="true">
          <div class="gradient-circle gradient-circle-large"></div>
          <div class="gradient-circle gradient-circle-small"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
