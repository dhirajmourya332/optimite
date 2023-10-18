module.exports = {
  apps: [
    {
      name: "authentication-service",
      script: "authentication-service/src/server.js",
      instances: 1,
    },
    {
      name: "task-service",
      script: "task-service/src/server.js",
      instances: 1,
    },
  ],
};
