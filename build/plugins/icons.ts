import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default function createIcons() {
  return Icons({
    compiler: 'vue3',
    customCollections: {
      custom: FileSystemIconLoader('./src/assets/icons'),
    },
    scale: 1,
    defaultClass: 'inline-block',
    autoInstall: true,
  });
}
