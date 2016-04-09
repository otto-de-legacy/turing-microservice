var nconf = require("nconf");
var glob = require("glob");
var path = require("path");
var fs = require("fs");
var template = require("string-template");

const configFolder = "config";

function loadEnvSpecifigConfig(dir) {
    var baseDir = path.join(process.cwd(), dir),
        envFile = path.join(baseDir, nconf.get("NODE_ENV") + ".json"),
        defaultFile = path.join(baseDir, "default.json");

    nconf.file(envFile, envFile);
    nconf.file(defaultFile, defaultFile);
}

function loadConfigFromProject() {
    loadEnvSpecifigConfig(configFolder);
}

function loadConfigFromModules() {
    var configDirs = glob.sync("**/*/turing-*/" + configFolder);

    console.log(configDirs);

    configDirs.forEach(loadEnvSpecifigConfig);
}

/**
 * Delete all null (or undefined) properties from an object.
 * Set 'recurse' to true if you also want to delete properties in nested objects.
 */
function delete_empty_properties(test, recurse) {
    for (var i in test) {
        if (!test[i]) {
            delete test[i];
        } else if (recurse && typeof test[i] === 'object') {
            delete_empty_properties(test[i], recurse);
        }
    }
}

function mapCustomEnvVariables() {
    var customEnvFile = path.join(process.cwd(), configFolder, "custom_env.json");

    if (fs.existsSync(customEnvFile)) {
        var customEnvContent = fs.readFileSync(customEnvFile).toString(),
            mappedConf = JSON.parse(template(customEnvContent, nconf.get()));

        delete_empty_properties(mappedConf, true);
        nconf.defaults(mappedConf);
    }
}

function loadConfig(config) {
    nconf.argv();
    nconf.env("__");
    if (config) {
        nconf.defaults(config);
    }

    mapCustomEnvVariables();
    loadConfigFromProject();
    loadConfigFromModules();
}

loadConfig();

nconf.update = loadConfig;

module.exports = nconf;
