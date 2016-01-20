const groupConfig = require(`./config/${process.env.GROUP}.config.json`);

module.exports = (() => {
  const defaultPort = 8989;
  const defaultConfig = {
    port: process.env.PORT || defaultPort,
    env: process.env.NODE_ENV,
    rootPath: '/turing-microservice'
  };

  return Object.assign(defaultConfig, groupConfig);
})();
