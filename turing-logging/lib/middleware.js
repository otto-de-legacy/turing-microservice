var config = require("turing-config");
var uuid = require("uuid");
var cls = require("continuation-local-storage");
var namespace = cls.createNamespace(config.get("turing:logging:namespace"));

module.exports = function(req, res, next) {
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);
    namespace.run(function() {
        namespace.set("uuid", uuid.v4());
        namespace.set("req", req);
        namespace.set("res", res);
        next();
    });
};
