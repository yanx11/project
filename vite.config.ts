module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/project/' // githup仓库名称
    : '/',
  transpileDependencies: true,
})
