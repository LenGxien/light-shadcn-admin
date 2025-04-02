import progress from 'vite-plugin-progress';

export default function createProgress() {
  return progress({
    format: '  :bar | :percent | :elapsed',
    total: 100,
    width: 40,
    complete: '=',
    incomplete: '',
  });
}
