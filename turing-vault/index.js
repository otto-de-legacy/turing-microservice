// TODO (BS): integrate better than using a promise...

'use strict';

const config = require('turing-config');
const Vault = require('node-vault');
const reduce = require('async/reduce');
const logger = require('turing-logging').logger;

module.exports = new Promise((resolve) => {
  const vaultConfig = config.get('turing:vault');

  if (vaultConfig.token) {
    const vault = Vault({
      endpoint: vaultConfig.address,
      token: vaultConfig.token
    });

    reduce(vaultConfig.secrets, {}, (secrets, secret, done) => {
      const path = secret.path;
      vault.read(path, {rejectUnauthorized: false})
        .then((result) => {
          if (result && result.data) {
            const name = path.split('/').pop();
            secrets[name] = secrets[name] || {};
            secrets[name][secret.key] = result.data[secret.key];
            done(null, secrets);
          }
        })
        .catch((error) => {
          done(error);
        });
    }, (error, secrets) => {
      if (error) {
        logger.error('Vault: Cannot read secrets from vault', error);
        throw new Error('Vault: Cannot read secrets from vault', error);
      }
      // TODO (BS): integrate better to config module
      config.update(secrets);
      logger.info('Vault: Read secrets from vault and injected them into the config');
      resolve();
    });
  } else {
    logger.warn('Vault: No token');
    resolve();
  }
});
