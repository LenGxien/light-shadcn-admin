import Icons from './icons';
import Components from './components';
import Progress from './progress';
import vue from '@vitejs/plugin-vue';
import type { PluginOption } from 'vite';

export function setupVitePlugins() {
  const plugins: PluginOption = [vue(), Icons(), Components(), Progress()];

  return plugins;
}
