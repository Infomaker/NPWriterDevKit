## Naviga Writer Developer startkit

### Plugin documentation

For a more detailed documentation on how to use the DevKit and develop
plugins for the Naviga Writer see the
[Writer developer documentation](https://docs.navigaglobal.com/writer/).

## Prerequisites

### Install mkcert

To enable SSL support locally, this project uses `mkcert` to install a local CA, and generating a certificate used by webpack.
Follow instructions found here [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert) to install the `mkcert` tool.

Run `mkcert -install` to install the local CA.

#### Set up local hostname

In order to access the plugin using SSL, you need to add this to your local `/etc/hosts`-file:

```bash
127.0.0.1       local.plugins.writer.infomaker.io
```

### nvm
We recommend that you use `nvm` to use a specific node version using this project. It is fine to bump Node version, but don't forget to adjust it in the `.nvmrc` file so everyone on the team always uses the same node version when developing.
  
[Link to nvm on Github](https://github.com/nvm-sh/nvm)  
How to setup shell integration so `nvm` automatically calls `nvm use` [shell-integration](https://github.com/nvm-sh/nvm#deeper-shell-integration)

## Get started overview

### 1. Make sure you have followed the steps in prerequisites
  
### 2. Clone

```bash
git clone git@github.com:Infomaker/NPWriterDevKit.git <your-plugin-folder>
cd <your-plugin-folder>
```

### 3. Remove git folder and create a new
```bash
rm -rf .git
git init
```

### 4. Update local files  
Update information in `package.json` and `Pluginpackage.ts`. To avoid any conflicts with other plugins
it's important to change the `id` and `name` values in these files.

Set the `version` property to `0.0.0` during development, or a different version. Setting it to `0.0.0` will
simplify the usage of running `release:*` scripts later on.

Replace the contents of this `readme.md` file with information about your plugin. A simple markdown example can be found in
`README.example.md`.

### 5. Install dependencies
Make sure you use the correct node version (`nvm use 16`)
  
```bash
npm install
```
    
### 6. Start the project
```bash
npm start
```

A webpack development server running at https://local.plugins.writer.infomaker.io:3000/  
Verify that the server runs by copying this url and paste in your browser. https://local.plugins.writer.infomaker.io:3000/index.js

_Specify port on dev server_ `PORT=1337 npm start`

## Build

Running `npm run build` will transpile the TypeScript files into javascript files which are then bundled using webpack, resulting in 
a deployable package suited for modern browsers.

This command will also run tests, if any exist. To opt out of using test files, simply remove any test files and modify the build command to
no longer run tests:

```
"build": "webpack --config __tooling__/webpack/webpack.prod.js"
```

Resulting bundle will end up in the `dist/` folder, together with any markdown- and image files in the plugin root folder. 

The important files required for actually using the plugin are:

```
index.js
style.css
```

## Versioning

We recommend using [Semantic Versioning](https://semver.org/) when working with deployment of writer plugins to clearly communicate the potential impact
an upgrade would have.

Running one of the `release:*` npm scripts will update the `version` property of `package.json`, and `package-lock.json` and create a git tag for that version.

```bash
    npm run release:major   # 1.0.0 -> 2.0.0
    npm run release:minor   # 1.0.0 -> 1.1.0
    npm run release:hotfix  # 1.0.0 -> 1.0.1
```

**Remember to update the `CHANGELOG.md` file before deploying a new version**

## Deploy

Currently this starterkit does not include any bitbucket pipelines/github actions definitions, since we can't make any real assumptions about 
the user's current hosting/development environment. However it is recommended to set up a pipeline for easier automated deployments.

For cache-busting, communication, and rollback purposes it's recommended to deploy the plugin to a version-prefixed folder structure.

Since the bundle created are pure static files it's also recommended to use some kind of cdn-like hosting environment, such as AWS CloudFront targeting
an S3 bucket.

E.g.

```
plugins.hosting.com/my-plugin/1.0.0/index.js
plugins.hosting.com/my-plugin/1.0.0/style.css

plugins.hosting.com/my-plugin/1.1.0/index.js
plugins.hosting.com/my-plugin/1.1.0/style.css
```

This also has the added benefit of making the `CHANGELOG.md` and `readme.md` available as part of the delivery (though it might be a good idea to include a markdown -> html conversion step to the build
process, to not serve raw markdown to the customer).
