import type { FunctionalComponent } from 'preact';
import './Marquee.css';

const skills = 'TYPESCRIPT — REACT — GO — PYTHON — RUST — KUBERNETES — DOCKER — GRAFANA — ';

const Marquee: FunctionalComponent = () => {
  return (
    <div class="marquee-container">
      <div class="marquee-track">
        <span class="marquee-content">{skills}</span>
        <span class="marquee-content" aria-hidden="true">{skills}</span>
      </div>
    </div>
  );
};

export default Marquee;
