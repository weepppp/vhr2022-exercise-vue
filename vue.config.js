const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
let proxyObj = {};
proxyObj['/myws'] = {
    ws: true,
    target: "ws://localhost:8083"
};
proxyObj['/'] = {
    ws: false,
    target: 'http://localhost:8083',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}
