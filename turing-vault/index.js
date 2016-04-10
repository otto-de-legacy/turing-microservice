'use strict';

const config = require('turing-config');
const Vault = require('node-vault');
const async = require('async');
const logger = require('turing-logging').logger;

module.exports = new Promise((resolve) => {
  const vaultConfig = config.get('turing:vault');

  let readFromVault;
  if (vaultConfig.token) {
    const vault = Vault({
      endpoint: vaultConfig.endpoint,
      token: vaultConfig.token
    });

    readFromVault = (secrets, secret, done) => {
      vault.read(vaultConfig.path + secret, (error, answer) => {
        if (error) {
          done(error, secrets);
        } else if (answer && answer.data) {
          secrets[secret] = answer.data.value;
          done(null, secrets);
        }
      });
    };

    async.reduce(vaultConfig.secrets, {}, readFromVault, (error, secrets) => {
      if (error) {
        logger.error('Vault: Cannot read secrets from vault', error);
        throw new Error('Vault: Cannot read secrets from vault', error);
      }
      config.update(secrets);
      logger.info('Vault: Read secrets from vault and injected them into the config');
      resolve(secrets);
    });
  } else {
    logger.warn('Vault: No token');
    resolve([]);
  }
});
