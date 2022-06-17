const {merge} = require('webpack-merge')
const path = require('path')
const {execSync} = require('child_process')
const detect = require('detect-port')
const inquirer = require('inquirer')
const chalk = require('chalk')
const CopyPlugin = require('copy-webpack-plugin')

const common = require('./webpack.common.js')

let port = process.env.PORT || 3000
const devBuild = Boolean(process.env.DEV_BUILD)

class Notifier {

    apply(compiler) {
        let run = true
        compiler.hooks.done.tap(
            'Notifier',
            ({compilation}) => {
                if (run === false) {
                    // Only run once after first emit
                    return
                }
                setTimeout(() => {
                    const assets = [...compilation.emittedAssets]
                    const script = assets.find((name) => name === 'index.js')
                    const style = assets.find((name) => name === 'style.css')

                    console.log(chalk.green.bold(`\n\tAssets (${process.cwd().split('/').pop()})`))

                    console.log(`\t"url": "https://local.plugins.writer.infomaker.io:${port}/${script}"${style ? `,\n\t"style": "https://local.plugins.writer.infomaker.io:${port}/${style}",` : ''}`)
                    console.log('')

                    run = false
                }, 0)
            }
        )
    }
}

if (devBuild) {
    module.exports = async (entry) => {
        return merge(
            common(entry),
            {
                mode: 'production',
                optimization: {
                    moduleIds: 'named',
                    chunkIds: 'named'
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
}
else {

    process.on('uncaughtException', function(err) {

        const {code, syscall, hostname} = err

        // Catch global error, probably local.plugins.writer.infomaker.io missing from hosts
        if (code === 'ENOTFOUND' && syscall === 'getaddrinfo' && hostname === 'local.plugins.writer.infomaker.io') {
            console.log(chalk.yellowBright(`\n\n\t--------------------------------------------------------------------------------`))
            console.log(chalk.yellow.bold(`\t   ⚠️  Remember to add local.plugins.writer.infomaker.io to your /etc/hosts ⚠️ `))
            console.log(chalk.yellowBright(`\t--------------------------------------------------------------------------------\n`))
        }
        else {
            console.error(err)
        }

        process.exit(1)
    })

    module.exports = async (entry) => {

        console.info(chalk.green.bold(`Refreshing local certificates...`))
        try {
            execSync(path.resolve(__dirname, '..', 'create-local-cert.sh'), {
                cwd: path.resolve(__dirname, '..')
            })
        } catch (error) {
            console.error(error.stdout.toString())
            process.exit(1)
        }

        const suggestedPort = await detect(port)

        if (suggestedPort !== port) {
            const {confirmPort} = await inquirer.prompt([
                {
                    name: 'confirmPort',
                    type: 'confirm',
                    message: `Port ${port} is already used, would you like to use a different port (${suggestedPort})?`
                }
            ])

            if (confirmPort === false) {
                console.warn(chalk.yellow('Aborting'))
                process.exit(0)
            }

            port = suggestedPort
        }

        return merge(
            common(entry),
            {
                mode: 'development',
                devServer: {
                    host: 'local.plugins.writer.infomaker.io',
                    allowedHosts: 'all',
                    client: {
                        progress: true
                    },
                    port,
                    hot: false,
                    server: {
                        type: 'https',
                        options: {
                            key: path.resolve(__dirname, '..', 'ssl', 'local.plugins.writer.infomaker.io-key.pem'),
                            cert: path.resolve(__dirname, '..', 'ssl', 'local.plugins.writer.infomaker.io-cert.pem')
                        }
                    }
                },
                resolve: {
                    symlinks: false
                },
                performance: false,
                cache: true,
                devtool: 'cheap-module-source-map',
                optimization: {
                    moduleIds: 'named',
                    chunkIds: 'named'
                },
                plugins: [
                    new Notifier()
                ]
            }
        )
    }
}