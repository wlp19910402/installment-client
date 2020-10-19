const path = require("path");
const { override, fixBabelImports,addLessLoader,addWebpackAlias ,addDecoratorsLegacy} = require('customize-cra');
const theme = require('./package.json').theme;
module.exports= override(
  addWebpackAlias({  //增加路径别名的处理
      '@': path.resolve(__dirname,"src"),
      "@@": path.resolve(__dirname, "src/components"),
  }),
  addDecoratorsLegacy(),

  fixBabelImports('import', {  //antd UI组件按需加载的处理
      libraryName: 'antd-mobile',
      // libraryDirectory: 'es',
      // 支持 less sass stylus
      style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme
  })
  //  (config)=>{ //暴露webpack的配置
  //   // 去掉打包生产map 文件
  //   // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  //   // if(process.env.NODE_ENV==="production") config.devtool=false;
  //   config.devtool=false
  //   return config
  // }
)