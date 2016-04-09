var express = require("express");
var config = require("turing-config");
var path = require("path");
var pkg = require(path.join(process.cwd(), "package.json"));
var logger = require("turing-logging").logger;

var app = express().enable("strict routing");

app.start = function() {
    var port = config.get("turing:server:port");

    app.listen(port, function() {
        logger.info(`${pkg.name} microservice listening on port ${port}!`);
    }).on("error", function(error) {
        if (error.syscall !== "listen") {
            throw error;
        }

        switch (error.code) {
            case "EACCES":
                throw new Error(`Port ${port} requires elevated privileges`);
            case "EADDRINUSE":
                throw new Error(`Port ${port} is already in use`);
            default:
                throw error;
        }
    });
};

module.exports = app;
