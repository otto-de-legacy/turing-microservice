# turing-vault

[![version](https://img.shields.io/npm/v/turing-vault.svg)](https://www.npmjs.com/package/turing-vault) [![license](https://img.shields.io/npm/l/turing-vault.svg)](./LICENSE)

A promise for merging secrets from vault with config.

## API

To enrich _turing-config_ with secrets from vault you simply have to require _turing-vault_. It will return a promise which makes it easy to react to success and error.

    const TuringVault = require('turing-vault');

    new TuringVault().then(() => {
      // do sth
    }).catch((error) => {
      throw error;
    });

### Config

- turing:vault:address - Url of vault endpoint. (default: "localhost")
- turing:vault:token -  Vault token.
- turing:vault:secrets - A list of secrets you want to import from vault.

Secret Format

    {
      path: "/a/path/to/the/secretConfig",
      key: "keyForTheValue"
    }

Get the secret with

    config.get("secretConfig:keyForTheValue");

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer
- Christian Finckler

## License

Apache-2.0
