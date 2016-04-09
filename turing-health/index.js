var router = require("express").Router();
var config = require("turing-config");

router.get(config.get("turing:server:routes:internal") + config.get("turing:health:route"), function (req, res) {
  res.send("OK");
});

module.exports = router;
