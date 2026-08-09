import type { FunctionalComponent } from 'preact';
import './Hero.css';

interface HeroProps {
  title: string;
  cta?: {
    label: string;
    link: string;
  };
}

const Hero: FunctionalComponent<HeroProps> = ({ title, cta }) => {
  return (
    <section class="hero-section">
      <h1 class="hero-name">Miguel Palau</h1>
      <div class="hero-rule"></div>
      <span class="hero-label">Senior Software Engineer</span>
      <p class="hero-bio">
        With a decade of experience at companies like Grafana Labs and Cratejoy,
        I build reliable software with TypeScript, React, and Go. I care about
        clean code, open source, and shipping things that matter.
      </p>
      <div class="hero-links">
        <a href="/resume" class="hero-cta">View resume &rarr;</a>
        <a href="/contact" class="hero-secondary">or get in touch</a>
      </div>
    </section>
  );
};

export default Hero;
