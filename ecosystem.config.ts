module.exports = {
  apps: [
    {
      name: "front-pybox",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        PORT: process.env.PORT || 8080,
      },
      watch: false,
      autorestart: true,
    },
  ],
};
