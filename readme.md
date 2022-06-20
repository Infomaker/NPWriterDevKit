## NPWriter Developer kit

### Plugin documentation
For a more detailed documentation on how to use the DevKit and develop
plugins for the Infomaker Digital Writer see the
[Writer developer documentation](https://docs.navigaglobal.com/writer/).

### Get started overview

Clone

```
git clone git@github.com:Infomaker/NPWriterDevKit.git
cd NPWriterDevKit
```

Install dependencies

```
npm install
```

### Install mkcert

To enable SSL support locally, this project uses `mkcert` to install a local CA, and generating a certificate used by webpack.
Follow instructions found here [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert) to install the `mkcert` tool.

Run `mkcert -install` to install the local CA.

#### Set up local hostname

In order to access the plugin using SSL, you need to add this to your local `/etc/hosts`-file:

```bash
127.0.0.1       local.plugins.writer.infomaker.io
```


Start a webpack development server running at https://local.plugins.writer.infomaker.io:3000/
```
npm start
```

_Specify port on dev server_ `PORT=1337 npm start`
