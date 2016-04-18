# turing-config

[![version](https://img.shields.io/npm/v/turing-config.svg)](https://www.npmjs.com/package/turing-config) [![license](https://img.shields.io/npm/l/turing-config.svg)](./LICENSE)

Hierarchical configuration with files, environment variables and command-line arguments.

## API

_turing-config_ will merge configs from several sources into one config.
Therefore it will override configs from following sources from default (1) to strongest (3):
1. default config
2. NODE_ENV specific config
3. env variables

The default config sets the base, NODE_ENV specific config overrules default config and env variable config overrules everything.

Only the env variables specified in _custom_env_ file will be merged into config.

### Config Dir

The default config dir will be <project-root>/config. To change that set the TURING_CONFIG_DIR env variable.

### Default Config

Default configs are stored in a _default.json_ file inside your config dir.

### NODE_ENV specific config

To add NODE_ENV specific configs add a config file called _{NODE_ENV}.json_ to the config dir.

### Env Variables

To add config values from env variables you have to create a file called _custom_env.json_.

### get(configPath)

To get a config value simple require _turing-config_ and call _get(configPath)_ inside the config dir.

    const config = require('turing-config');

    const myConfigPathValue = config.get('my:config:path');

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

MIT
