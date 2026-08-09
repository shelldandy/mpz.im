import type { FunctionalComponent } from 'preact';
import './Hero.css';

const Hero: FunctionalComponent = () => {
  return (
    <section class="hero-section">
      <div class="terminal-window">
        <div class="terminal-chrome">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
          <span class="terminal-chrome-title">~</span>
        </div>
        <div class="terminal-body">
          <div class="terminal-line">
            <span class="prompt">$</span> <span class="cmd">whoami</span>
          </div>
          <div class="terminal-output">Miguel Palau</div>
          <br />
          <div class="terminal-line">
            <span class="prompt">$</span> <span class="cmd">cat /etc/motd</span>
          </div>
          <div class="terminal-output">
            Senior Fullstack Engineer @ Grafana Labs
            <br />
            10 years building software that scales.
          </div>
          <br />
          <div class="terminal-line">
            <span class="prompt">$</span> <span class="cmd">ls ~/stack</span>
          </div>
          <div class="terminal-output">
            TypeScript  React  Go  Python  Rust  Docker  K8s
          </div>
          <br />
          <div class="terminal-line">
            <span class="prompt">$</span> <span class="cursor">{'█'}</span>
          </div>
        </div>
      </div>
      <div class="hero-ctas">
        <a href="/resume" class="terminal-btn">[$ view resume]</a>
        <a href="/contact" class="terminal-btn">[$ send mail]</a>
      </div>
    </section>
  );
};

export default Hero;
