#!/bin/sh

SCRIPT_DIR="$(dirname "$(realpath "$0")")";

cp "$SCRIPT_DIR/../etc/tailstat.conf" /etc/
cp "$SCRIPT_DIR/../etc/nginx/sites-available/tailstat" /etc/nginx/sites-available/

ln -s /var/nginx/sites-available/tailstat /var/nginx/sites-enabled/

systemctl restart nginx

echo "Tailstat successfully installed."
