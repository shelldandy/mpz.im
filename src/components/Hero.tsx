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

const Hero: FunctionalComponent<HeroProps> = ({ title }) => {
  const techStack = ['TypeScript', 'React', 'Go', 'Python', 'Rust', 'Docker', 'K8s', 'AWS'];
  return (
    <section class="hero-section">
      <div class="hero-container">
        <span class="hero-label">Fullstack Engineer</span>
        <h1 class="hero-title">I build products people rely on.</h1>
        <p class="hero-subtitle">
          Senior Engineer at Grafana Labs with 10 years of experience in TypeScript, React, and Go.
        </p>
        <div class="tech-badges">
          {techStack.map(tech => (
            <span class="tech-badge" key={tech}>{tech}</span>
          ))}
        </div>
        <div class="hero-ctas">
          <a href="/resume" class="btn btn-primary">View Resume &rarr;</a>
          <a href="/contact" class="btn btn-secondary">Get in Touch</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
