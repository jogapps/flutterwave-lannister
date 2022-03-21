const express = require("express");
const { addFeeSpec } = require("../controllers/FeeController");
const { addSpecMiddleware } = require("../utils/validations/addSpec");

const router = express.Router();

router.post("/", addSpecMiddleware, addFeeSpec);

module.exports = router; 