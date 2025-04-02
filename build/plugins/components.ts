import Components from 'unplugin-vue-components/vite';

export default function createComponents() {
  return Components({
    dirs: ['src/components'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'src/typings/components.d.ts',
    resolvers: [],
  });
}
