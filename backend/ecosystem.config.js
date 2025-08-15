module.exports = {
  apps: [{
    script: 'index.js',
    watch: '.',
    autorestart: true,
    max_restarts: 3,
    restart_delay: 5000,
    log_file: "C:\\Project\\kiosk-jhcis-backend\\logs"
  }],
};
