import App from './static/app/App';

const root = document.getElementById('app')!;
App.set(root, {
  debugUI: false,
  production: __ISPRODUCTION__,
  input: ['keyboard'],
  baseURL: '',
});
declare global {
  const __ISPRODUCTION__: boolean;
}
