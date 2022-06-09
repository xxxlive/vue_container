const path = require('path') // 引用path模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin

module.exports = {  // 这里是commrnt.js语法
    // 入口文件
    entry: "./src/index.js",
    // 打包后的出口文件
    output: {
        // 输出的路径  是绝对路径(导入path模块) 这里是用node来做的
        path: path.resolve(__dirname, 'build'),
        // 输出的文件名称
        filename: 'build.js',
    },
    // loader的配置
    module: {
        rules: [
            // 详细loader配置
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {appendTsSuffixTo: [/\.vue$/]}
            },
            // 打包css的配置
            {
                // 使用正则表达式,匹配那些文件
                test: /\.css$/,
                use: [
                    // use数组中loader执行顺序, 从右到左, 从下到上, 依次执行
                    // 创建style标签, 将js中的样式资源插入进行, 添加到head中生效
                    'style-loader',
                    // 将css文件变成commitjs模块加载js中, 里面的内容是样式字符串
                    'css-loader'
                ]
            },
            // 打包scss的配置
            {
                test: /\.scss$/,
                // 注意 是sass-loader ，不是 scss-loader
                // 是数组,代表的是要使用多个loader处理,用use
                use: [
                    'style-loader',
                    'css-loader',
                    // 将scss文件编译成css文件
                    'sass-loader'
                ]
            },
            {
                // 问题:默认处理不了html中img图片
                // 处理图片资源
                test: /\.(jpg|png|gif)/,
                // 使用一个loader时,直接写就行了
                loader: 'url-loader',
                options: {
                    // 图片大小小于8KB,就会被base64处理
                    // 优点:减少请求数量(减轻服务器压力)
                    // 缺点:图片体积会增大, 就会导致文件请求速度更慢
                    limit: 8 * 1024,
                    // 问题: 因为url-loader默认使用es6模块化解析,
                    // 而html-loader引入图片是commonjs
                    // 解析时会出问题: [object Module]
                    // 解决: 关闭url-loader的es6模块化, 使用commonjs解析
                    esModule: false,
                    // 给图片进行重命名
                    // [hash:10]取图片的hash的前10位
                    // [ext]去文件原来扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html文件的img图片 (负责引入img, 从而能被url-loader进行处理)
                loader: 'html-loader'
            }
        ]
    },
    // plugins的配置
    plugins: [
        // 详细plugins的配置

        // 因为是直接引的,所以 new 就好了
        // 功能:默认会创建一个空的HTML文件,自动引入打包输出的所有资源(JS/CSS)
        new HtmlWebpackPlugin({
            // 复制 './src/index.html'文件,并自动引入打包输出的所有资源(JS/CSS)
            template: './src/index.html'
        })
    ],
    // 使用开发模式打包
    mode: "development",

    // 开发服务器 devServer:用来自动化(自动编译,自动打开浏览器,自动刷新浏览器)
    // 用简单概括就是: 热更新
    // 特点:只会在内存中编译打包,不会有任何输出
    // 启动指令: webpack-dev-server 你也可以在package.json文件中重新修改指令
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 修改端口号
        port: 8080,
        //自动打开浏览器
        open: true
    }
}
