# vue-cli-electron
Vue 集成 electron Demo 项目

1.如果要在自生项目中使用的话，可直接将 electron 目录拷贝到自生项目根目录中

2.在 package.json 配置中调整配置

  2.1 添加 scripts 脚本命令

    "electron-dev": "node electron/config/electron-run-dev.js",
    "electron-build": "vue-cli-service build && node electron/config/electron-build-pro.js && electron-builder --dir"
    
  2.2 electron build 路径配置
  
    "directories": {
      "output": "build/electron-build"
    }
    
    "files": [
      "build/vue-build/**/*"
    ]
    
3.更改 vue 配置
    
    // 这个值也可以被设置为相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
    publicPath: './',
    // 输出文件目录 - 指定 build/vue-build
    outputDir: 'build/vue-build'
