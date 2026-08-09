import type { FunctionalComponent } from 'preact';
import './StatBar.css';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '3', label: 'Companies' },
  { value: '5+', label: 'Languages' },
  { value: '100%', label: 'Remote Ready' },
];

const StatBar: FunctionalComponent = () => {
  return (
    <section class="stat-bar">
      <div class="stat-bar-container">
        {stats.map(stat => (
          <div class="stat-item" key={stat.label}>
            <span class="stat-value">{stat.value}</span>
            <span class="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatBar;
