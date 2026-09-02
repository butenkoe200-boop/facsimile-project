# Travel Pay — развёртывание на собственном VPS (РФ)

Схема: `Пользователь → HTTPS → Nginx → Node.js (SSR, порт 3000) → VPS в РФ`

Внешних runtime-зависимостей нет: шрифты, изображения, иконки, JS и CSS отдаются с вашего сервера.

## Архитектура

- Frontend: React 19 + TanStack Start/Router + Vite 8 + Tailwind 4 + shadcn/ui
- Backend: SSR-сервер приложения (Nitro, preset `node-server`). Отдельного API/бэкенда нет — данные mock (`src/lib/order.ts`), состояние в React-контексте + `localStorage` (`tp-lang`)
- База данных: **отсутствует**
- Файловое хранилище: **не используется** (загрузок файлов нет)
- Внешние API: **нет**
- Аутентификация: **нет** (страница `/profile` — статичный mock)

## 1. Подготовка сервера (Ubuntu 22.04/24.04)

```bash
ssh root@YOUR_SERVER_IP
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs nginx git
npm install -g pm2
node -v   # ожидается v22.x
```

## 2. Клонирование и установка

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/YOUR_USER/YOUR_REPO.git travel-pay
cd /var/www/travel-pay
npm install
```

## 3. Переменные окружения

```bash
cp .env.example .env
nano .env      # NODE_ENV=production, PORT=3000, HOST=127.0.0.1
```

## 4. Production-сборка

```bash
npm run build:vps       # = NITRO_PRESET=node-server vite build
ls -la .output/server/index.mjs   # файл должен существовать
```

## 5. Запуск приложения

```bash
mkdir -p /var/log/travel-pay
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup      # выполните команду, которую выведет pm2
curl -I http://127.0.0.1:3000/    # ожидается HTTP/1.1 200 OK
```

## 6. Nginx

```bash
cp /var/www/travel-pay/deploy/nginx.conf /etc/nginx/sites-available/travel-pay
sed -i 's/YOUR_DOMAIN.RU/ваш-домен.ru/g' /etc/nginx/sites-available/travel-pay
ln -sf /etc/nginx/sites-available/travel-pay /etc/nginx/sites-enabled/travel-pay
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

## 7. HTTPS (Let's Encrypt)

Сначала закомментируйте в конфиге блок `server { listen 443 ... }` (или используйте `--nginx` после получения сертификата):

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru --agree-tos -m you@example.ru --redirect
systemctl reload nginx
certbot renew --dry-run
```

## 8. Firewall

```bash
ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable
```

Порт 3000 наружу открывать НЕ нужно — приложение слушает только 127.0.0.1.

## 9. Проверка

```bash
curl -I https://ваш-домен.ru/
curl -s https://ваш-домен.ru/ | grep -c "fonts.googleapis"   # должно быть 0
curl -I https://ваш-домен.ru/fonts/manrope-v20-xn7gYHE41ni1AdIRggOxSuXd.woff2
```

## 10. Обновление сайта

```bash
cd /var/www/travel-pay && ./deploy/deploy.sh
```

## Стабильность HTTPS в РФ (MTU/MSS)

Если сайт открывается по HTTP, но HTTPS отваливается по таймауту у части пользователей:

```bash
iptables -t mangle -A OUTPUT -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
iptables -A INPUT -p icmp --icmp-type fragmentation-needed -j ACCEPT
apt install -y iptables-persistent && netfilter-persistent save
```

## Docker

Не нужен: одно Node-приложение без БД и очередей. PM2 + Nginx проще и надёжнее.
