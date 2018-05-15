const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

const port = process.env.PORT || 3000

class Notifier {
    apply(compiler) {
        compiler.plugin('done', (statsObj) => {
            const stats = statsObj.toJson()
            setTimeout(() => {
                const {assets} = stats
                console.log('Plugin assets served at: ')
                assets.forEach(({name}) => {
                    console.log(`http://localhost:${port}/${name}`)
                })
            }, 0)
        })
    }
}

module.exports = merge(common,
    {
        mode: 'development',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            historyApiFallback: true,
            inline: true,
            compress: false,
            progress: true,
            port
        },
        resolve: {
            symlinks: false
        },
        performance: false,
        cache: true,
        devtool: 'cheap-module-eval-source-map',
        optimization: {
            namedModules: true,
            namedChunks: true
        },
        plugins: [
            new Notifier()
        ]
    }
)
