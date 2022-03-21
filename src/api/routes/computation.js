const express = require("express");
const { compute } = require("../controllers/ComputationController");
const { computeSpecMiddleware } = require("../utils/validations/computationSpec");

const router = express.Router();

router.post("/", computeSpecMiddleware, compute);

module.exports = router; 