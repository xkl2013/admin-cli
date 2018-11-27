const path = require('path');
export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  alias: {
    '@': path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components/'),
    selfComponent: path.resolve(__dirname, 'src/selfComponent/'),
    utils: path.resolve(__dirname, 'src/utils/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  disableDynamicImport: false,
  publicPath: '/',
  hash: true,
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      define: {
        'process.env.API_TYPE': process.env.API_TYPE,
        'process.env.__CDN__': 'http://bi-m.ministudy.com/staticFile/bi_img',
        USE_COMMA: 2,
      },
    },
    production: {
      define: {
        'process.env.API_TYPE': process.env.API_TYPE,
        'process.env.__CDN__': 'http://bi-m.ministudy.com/staticFile/bi_img',
        USE_COMMA: 2,
      },
    },
  },
};
