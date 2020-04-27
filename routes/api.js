const express = require("express");
const router = express.Router();

const APICtrl = require("../controllers/api");

router.get("", APICtrl.getMeta);

module.exports = router;
