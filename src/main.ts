import App from './static/app/App';

const root = document.getElementById('app')!;
App.set(root, {
  debugUI: true,
  production: __ISPRODUCTION__,
  input: ['keyboard'],
  baseURL: '',
  engine: 'webgl',
});
declare global {
  const __ISPRODUCTION__: boolean;
}
