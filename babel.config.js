module.exports = {
    presets: [
        '@babel/preset-typescript',
        ['@babel/preset-env',
            {
                'targets': {
                    'browsers': [
                        'last 2 Chrome versions',
                        'last 2 Firefox versions',
                        'last 2 Safari versions',
                        'last 1 Edge versions'
                    ]
                }
            }]
    ]
}