import type { FunctionalComponent } from 'preact';
import './Hero.css';

interface HeroProps {
  imageUrl?: string;
  title?: string;
  cta?: {
    label: string;
    link: string;
  };
}

const Hero: FunctionalComponent<HeroProps> = () => {
  return (
    <section class="hero-section">
      <div class="hero-container">
        <span class="hero-label">Senior Fullstack Engineer</span>
        <h1 class="hero-title">I build reliable, scalable software for teams that ship.</h1>
        <p class="hero-subtitle">10 years of experience shipping TypeScript, React, and Go at companies like Grafana Labs and Cratejoy.</p>
        <div class="hero-ctas">
          <a href="/resume" class="btn btn-primary">View Resume</a>
          <a href="/contact" class="btn btn-secondary">Get in Touch</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
