module.exports = {
  apps: [
    {
      name: 'kiosk-backend',
      cwd: './backend',
      script: 'index.js',
      watch: true,
      autorestart: true,
      max_restarts: 3,
      restart_delay: 5000,
      log_file: "logs/backend.log",
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'kiosk-frontend',
      cwd: './frontend/server',
      script: 'node',
      args: 'index.mjs',
      watch: true,
      autorestart: true,
      max_restarts: 3,
      restart_delay: 5000,
      log_file: "logs/frontend.log",
      env: {
        NODE_ENV: 'production',
        NITRO_PORT: 3000,
        NITRO_HOST: 'localhost'
      }
    }
  ]
}; 