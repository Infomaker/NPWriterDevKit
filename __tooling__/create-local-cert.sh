#!/bin/bash -e

echo "INFO: Generating local certificate for domain local.plugins.writer.infomaker.io using mkcert"

if ! command -v mkcert &> /dev/null
then
    echo "ERROR: mkcert could not be found, please install it first: https://github.com/FiloSottile/mkcert"
    exit 1
fi

if [ ! -d "./ssl" ]; 
    then 
        mkdir ./ssl;
fi

mkcert \
-cert-file ./ssl/local.plugins.writer.infomaker.io-cert.pem \
-key-file ./ssl/local.plugins.writer.infomaker.io-key.pem  \
"local.plugins.writer.infomaker.io"
