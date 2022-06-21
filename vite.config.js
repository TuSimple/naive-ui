const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const createDemoPlugin = require('./build/vite-plugin-demo')

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  root: __dirname,
  plugins: createDemoPlugin(),
  resolve: {
    // In production site build, we want to import naive-ui from node_modules
    alias:
      process.env.NODE_ENV !== 'production'
        ? [
            {
              find: 'naive-ui',
              replacement: path.resolve(__dirname, './src')
            }
          ]
        : undefined
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    'process.env.TUSIMPLE': !!process.env.TUSIMPLE,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  optimizeDeps: {
    include: [
      '@css-render/plugin-bem',
      'async-validator',
      'css-render',
      'date-fns/esm',
      'date-fns-tz/esm/getTimezoneOffset',
      'evtd',
      'highlight.js',
      'lodash-es',
      'seemly',
      'treemate',
      'vdirs',
      'vooks',
      'vue',
      'vue-router',
      'vueuc',
      '@css-render/vue3-ssr',
      'date-fns-tz',
      'codesandbox/lib/api/define',
      'highlight.js/lib/core',
      'highlight.js/lib/languages/javascript',
      'highlight.js/lib/languages/python',
      'highlight.js/lib/languages/cpp',
      'highlight.js/lib/languages/xml',
      '@vicons/ionicons5',
      '@vicons/ionicons4',
      '@vicons/fluent/Compose16Regular.js',
      'date-fns/esm/locale/nb',
      'date-fns/esm/locale/fr',
      'date-fns/esm/locale/id',
      'date-fns/esm/locale/de',
      'date-fns/esm/locale/ja',
      'date-fns/esm/locale/zh-CN',
      'date-fns/esm/locale/en-US',
      'date-fns/esm/locale/ru',
      'date-fns/esm/locale/uk',
      'date-fns/esm/locale/zh-TW',
      'date-fns/esm/locale/es',
      'date-fns/esm/locale/it',
      'date-fns/esm/locale/en-GB',
      'date-fns/esm/locale/pl',
      'date-fns/esm/locale/eo',
      'date-fns/esm/locale/sk',
      'date-fns/esm/locale/pt-BR',
      'date-fns/esm/locale/th',
      'date-fns/esm/locale/ko',
      'date-fns/esm/locale/nl'
    ],
    exclude: ['__INDEX__']
  },
  test: {
    deps: {
      inline: ['date-fns']
    },
    globals: true,
    include: ['./src/**/*.(spec|test).(ts|tsx)'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    transformMode: {
      web: [/\.[tj]sx$/]
    }
  },
  build: {
    outDir: 'site',
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled'
        })
      ]
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}
