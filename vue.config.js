module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map'
  },
  // 它支持webPack-dev-server的所有选项
  devServer: {
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: {
    //
    // }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/style/variables.scss";`
      }
    }
  }
};



