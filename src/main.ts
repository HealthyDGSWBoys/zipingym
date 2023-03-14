import App from '$app/App';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app')!;
  const app = new App(root, {
    debugUI: true,
    framerate: 12,
  });
  app.run();
});
