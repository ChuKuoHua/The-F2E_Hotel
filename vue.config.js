module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      const [obj] = args;
      obj.title = 'Hotels';
      obj.meta = {
        keywords: 'Hotels, 個人作品',
      }
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/The-F2E_Hotel/'
    : '/'
};