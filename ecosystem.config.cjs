/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: 'portfolio-latyr',
      cwd: '/home/latyr/hosts/portfolio-A-latyr',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000 -H 127.0.0.1',
      interpreter: '/home/latyr/.nvm/versions/node/v24.18.0/bin/node',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
    },
  ],
};
