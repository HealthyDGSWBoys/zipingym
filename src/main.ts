import App from './core/app';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')!;
  const app = new App(root, {
    debugUI: true,
  });
});
