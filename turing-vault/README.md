# turing-vault

[![version](https://img.shields.io/npm/v/turing-vault.svg)](https://www.npmjs.com/package/turing-vault) [![license](https://img.shields.io/npm/l/turing-vault.svg)](./LICENSE)

A promise for merging secrets from vault with config.

## API

To enrich _turing-config_ with secrets from vault you simply have to require _turing-vault_. It will return a promise which makes it easy to react to success and error.

    const vaulted = require('turing-vault');

    vaulted.then(() => {
      // do sth
    }).catch((error) => {
      throw error;
    });

### Config

- turing:vault:endpoint - Url of vault endpoint. (default: "localhost")
- turing:vault:token -  Vault token.
- turing:vault:path - Your applications path inside vault.
- turing:vault:secrets - A list of secrets you want to import from vault.

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

MIT
