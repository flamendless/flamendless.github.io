#!/usr/bin/env bash

# Brandon Blanker Lim-it @flamendless

set -euf -o pipefail

echo "Building..."
bundle exec jekyll build

SSH_ADDR="${SSH_ADDR}"
if [ -z "${SSH_ADDR}" ]; then
    echo "Provide SSH_ADDR"
    exit 1
fi

read -s -p "Enter password: " pw
sshpass -p "${pw}" scp -v -r "./_site" "${SSH_ADDR}:/var/www/"
