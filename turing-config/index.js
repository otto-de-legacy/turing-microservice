'use strict';

const path = require('path');
const nconf = require('nconf');
const glob = require('glob');
const fs = require('fs');
const template = require('string-template');

const configFolder = process.env.TURING_CONFIG_DIR || 'config';

function loadEnvSpecificConfig(dir) {
  const baseDir = path.join(process.cwd(), dir);
  const envFile = path.join(baseDir, `${process.env.ACTIVE_PROFILE}.json`);
  const defaultFile = path.join(baseDir, 'default.json');

  nconf.file(envFile, envFile);
  nconf.file(defaultFile, defaultFile);
}

function loadConfigFromModules() {
  glob.sync('**/*/turing-*/config').forEach(loadEnvSpecificConfig);
}

function loadConfigFromProject() {
  loadEnvSpecificConfig(configFolder);
}

function deleteEmptyPropertiesOf(object) {
  for (const property in object) {
    if (object.hasOwnProperty(property) && !object[property]) {
      delete object[property];
    } else if (typeof object[property] === 'object') {
      deleteEmptyPropertiesOf(object[property]);
    }
  }
}

function mapCustomEnvVariables() {
  const customEnvFile = path.join(process.cwd(), configFolder, 'custom-env.json');

  if (fs.existsSync(customEnvFile)) {
    const customEnvContent = fs.readFileSync(customEnvFile).toString();
    const mappedConf = JSON.parse(template(customEnvContent, process.env));

    deleteEmptyPropertiesOf(mappedConf);
    nconf.defaults(mappedConf);
  }
}

function loadConfig(config) {
  if (config) {
    nconf.overrides(config);
  }

  mapCustomEnvVariables();
  loadConfigFromProject();
  loadConfigFromModules();
}

loadConfig();

nconf.update = loadConfig;

module.exports = nconf;
