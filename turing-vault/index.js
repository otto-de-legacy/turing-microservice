var config = require("turing-config");
var logger = require("turing-logging").logger;
var async = require("async");
var Vault = require("node-vault");

module.exports = new Promise(function(resolve, reject) {
    var vaultConfig = config.get("turing:vault");

    if (vaultConfig.token) {
        var vault = Vault({
            "endpoint": vaultConfig.endpoint,
            "token": vaultConfig.token
        });

        // Für local:
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        function readFromVault(secrets, secret, cb) {
            vault.read(vaultConfig.path + secret, function(err, data) {
                if (err) {
                    cb(err, secrets);
                } else if (data && data.data) {
                    secrets[secret] = data.data.value;
                    cb(null, secrets);
                }
            });
        }

        async.reduce(vaultConfig.secrets, {}, readFromVault, function(err, result) {
            if (err) {
                logger.error("Vault: Cannot read secrets from vault", err);
                throw new Error(err);
            }

            config.update(result);
            logger.info("Vault: Read secrets from vault and injected them into the config");
            resolve(result);
        });
    } else {
      logger.warn("Vault: No token");
      resolve([]);
    }
});
