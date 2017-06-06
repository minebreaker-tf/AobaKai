var webpack = require("webpack");

module.exports = {
    resolve: {
        alias: {
            // エラー。おそらくES6関連? TSのターゲットをes6にしてbabel入れるほうがいいかも
            // 'vue$': 'vue/dist/vue.esm.js'
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};
