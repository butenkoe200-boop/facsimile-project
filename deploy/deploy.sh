#!/usr/bin/env bash
# Обновление production-сборки Travel Pay на VPS.
# Запуск: cd /var/www/travel-pay && ./deploy/deploy.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/travel-pay}"
cd "$APP_DIR"

echo "==> git pull"
git pull --ff-only origin main

echo "==> npm ci (или npm install, если нет package-lock.json)"
if [ -f package-lock.json ]; then npm ci; else npm install; fi

echo "==> production build (Nitro node-server)"
NITRO_PRESET=node-server npm run build

echo "==> restart PM2"
pm2 restart travel-pay --update-env || pm2 start ecosystem.config.cjs
pm2 save

echo "==> done"
