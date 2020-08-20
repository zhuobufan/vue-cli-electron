const {exec} = require('child_process');
const jsonUp = require('./util/JsonUpUtil')

// 开发环境配置
process.env.NODE_ENV = 'development';

// 修改package.json为开发环境入口
jsonUp.changeJsonMain('electron/dev/main.js');

// 定义进程
// vue 服务进程
let dev_vue_process = null;
// electron 服务进程
let dev_electron_process = null;

init()
// 启动服务
function init() {
    // 启动Vue服务
    if(dev_vue_process == null){
        // 执行启动 Vue 服务命令
        dev_vue_process = exec('vue-cli-service serve',{});

        dev_vue_process.stdout.on('data', data => {
            electronLog(data)
            // 当 Vue 执行输出 http 访问连接时判断启动成功
            if(data.indexOf("http") > -1){
                // 启动 electron
                startElectron()
            }
        })
        dev_vue_process.stderr.on('data', data => {
            if(data.indexOf("<s> [webpack.Progress]") < 0){
                electronLog(data)
            }
        })
    }
}

// 启动 electron
function startElectron() {
    if(dev_electron_process == null){
        // 执行 electron 入口为 package.json 中配置的 main 属性
        dev_electron_process = exec('electron .',{});
        dev_electron_process.stdout.on('data', data => {
            console.log(data)
        })
        dev_electron_process.stderr.on('data', data => {
            console.log(data)
        })
        dev_electron_process.on('close', () => {
            // 进程关闭时退出
            process.exit()
        })
    }
}

// 打印日志
function electronLog (data) {
    let log = ''
    data = data.toString().split(/\r?\n/)
    data.forEach(line => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        console.log(
            '┏ Electron -------------------' +
            '\n\n' +
            log +
            '┗ ----------------------------' +
            '\n'
        )
    }
}