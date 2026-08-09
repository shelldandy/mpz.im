import type { FunctionalComponent } from 'preact';
import './GradientCTA.css';

const GradientCTA: FunctionalComponent = () => {
  return (
    <section class="gradient-cta">
      <h2>Let's create something great.</h2>
      <a href="/contact" class="cta-button">Get in Touch</a>
    </section>
  );
};

export default GradientCTA;
