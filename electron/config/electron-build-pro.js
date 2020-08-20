const fs = require('fs')
const path = require('path')
const jsonUp = require('./util/JsonUpUtil')

// 发布正式环境配置
process.env.NODE_ENV = 'production';

// 修改package.json为发布环境入口
jsonUp.changeJsonMain('build/vue-build/main.js');

// 将 electron-dev 目录中的所有文件复制到 build/vue-build 目录中一起打包
exists(path.join(__dirname, '../dev'), path.join(__dirname, '../../build/vue-build'), copy );

/**
 * 复制目录中的所有文件包括子目录
 * @param src 需要复制的目录
 * @param dst 复制到指定的目录
 */
function copy(src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, (err, paths)=> {
        if (err) {
            throw err;
        }

        paths.forEach(function (path) {
            let _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;

            fs.stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }

                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
}

// 判断该目录是否存在，不存在需要先创建目录
function exists(src, dst, callback) {
    fs.exists(dst, function (exists) {
        // 已存在
        if (exists) {
            callback(src, dst);
        }
        // 不存在
        else {
            fs.mkdir(dst, function () {
                callback(src, dst);
            });
        }
    });
}