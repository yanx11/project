module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/myweb/' // githup仓库名称
    : '/',
  transpileDependencies: true,
})
