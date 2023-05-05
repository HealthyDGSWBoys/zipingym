import App from './app/App';

const root = document.getElementById('app')!;
App.init(root, {
  debugUI: true,
  production: true,
  input: ['keyboard', 'exercise'],
  baseURL: '',
  engine: 'webgl',
});

declare global {
  const __ISPRODUCTION__: boolean;
}
