const fs = require('fs');
const path = require('path')
let packageJson = {}

/**
 * 修改指定Json文件
 * @param jsonFile 文件路径
 * @param key       需要修改的key
 * @param newVal    新的值
 */
function changeJson(jsonFile, key, newVal) {
    packageJson = {};
    jsonFile = path.join(__dirname, jsonFile);
    fs.readFile(jsonFile, (err, data) => {
        if (err) {
            console.error(err);
        }
        // 获取json文件数据
        packageJson = data.toString();
        packageJson = JSON.parse(packageJson);

        if(packageJson[key] != newVal){
            // 修改对应Key
            packageJson[key] = newVal;

            // 保存到文件
            let newJson = JSON.stringify(packageJson, null, "\t");
            fs.writeFile(jsonFile, newJson, function (err) {
                if (err) {
                    console.error(err);
                }
            })
        }
    });
}

module.exports = {
    changeJsonMain: (val) => {
        console.log("程序入口：", val)
        changeJson('../../../package.json', 'main', val)
    }
}