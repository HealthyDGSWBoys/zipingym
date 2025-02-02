import App from './app/App';

const root = document.getElementById('app')!;
App.init(root, {
  debugUI: false,
  production: __ISPRODUCTION__,
  input: ['keyboard', 'exercise'],
  baseURL: '',
  engine: undefined,
});

declare global {
  const __ISPRODUCTION__: boolean;
}
