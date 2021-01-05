const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: '',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')({
            autoprefixer: {
              overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
            }
          }),
          require('postcss-pxtorem')({
            rootValue: 108,
            minPixelValue: 2,
            propWhiteList: []
          })
        ]
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@exercises': resolve('public/static/exercises'),
        '@solve': resolve('src/solve')
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('markdown').test(/\.md$/).use('html-loader').loader('html-loader').end().use('markdown-loader').loader('markdown-loader').end();
  },
  devServer: {
    port: 3010,
    https: false,
    hotOnly: false,
    disableHostCheck: true
  }
};
