#!/usr/bin/env bash

# Brandon Blanker Lim-it @flamendless

SSH_ADDR="${SSH_ADDR}"
PW="${PW}"

if [ -z "${SSH_ADDR}" ]; then
    echo "Provide SSH_ADDR"
    exit 1
fi

if [ -z "${PW}" ]; then
    echo "Provide PW"
    exit 1
fi

set -euf -o pipefail

echo "Building..."
bundle exec jekyll build

echo "Copying to server..."
sshpass -f "${PW}" scp -v -r "./_site" "${SSH_ADDR}:/var/www/"
