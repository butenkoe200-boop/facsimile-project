// PM2 production-конфигурация для Travel Pay (TanStack Start SSR, Nitro node-server).
// Запуск: pm2 start ecosystem.config.cjs && pm2 save
module.exports = {
  apps: [
    {
      name: "travel-pay",
      script: ".output/server/index.mjs",
      cwd: "/var/www/travel-pay",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "127.0.0.1",
      },
      out_file: "/var/log/travel-pay/out.log",
      error_file: "/var/log/travel-pay/error.log",
      time: true,
    },
  ],
};
