import App from './App';
import './style.css';

window.addEventListener('load', () => {
  const app = App();
  document.body.appendChild(app.container);
  app.animate();
  window.addEventListener('resize', app.handleResize, false);
});
