import type { FunctionalComponent } from 'preact';
import './AvailabilityCTA.css';

const AvailabilityCTA: FunctionalComponent = () => {
  return (
    <section class="availability-cta">
      <div class="availability-container">
        <h2 class="availability-heading">Currently available for</h2>
        <ul class="availability-list">
          <li><span class="check">&#10003;</span> Freelance projects</li>
          <li><span class="check">&#10003;</span> Consulting &amp; advisory</li>
          <li><span class="check">&#10003;</span> Full-time opportunities</li>
        </ul>
        <a href="/contact" class="btn btn-primary btn-large">Get in Touch</a>
        <p class="response-time">Usually responds within 24 hours</p>
      </div>
    </section>
  );
};

export default AvailabilityCTA;
