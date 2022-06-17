const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = () => {
    const entry = './src/index.ts'
    // const outputPath = path.join(__dirname, '..', '..', 'dist')
    return merge(
        common(entry),
        {
            mode: 'production',
            optimization: {
                emitOnErrors: true,
                minimizer: [
                    new TerserPlugin({
                        parallel: true
                    }),
                    new CssMinimizerPlugin()
                ]
            },
            plugins: [
                new CopyPlugin({
                    patterns: [
                        {from: '*.md', to: './'},
                        {from: '*.{png,jpg,jpeg,gif}', to: './', noErrorOnMissing: true},
                        {from: 'manifest.json', to: './'},
                        {from: 'schema.json', to: './', noErrorOnMissing: true}
                    ]
                })
            ]
        }
    )
}
