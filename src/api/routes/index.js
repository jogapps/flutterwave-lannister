const express = require("express");
const moment = require("moment");
const { successMessageWelcome } = require("../utils/response/success");
const router = express.Router();

// routes
const feeRoute = require("./fees");
const computeRoute = require("./computation");

const apiVersion = "1.0.0";

// console log every visited route
router.use((req, res, next) => {
    console.log(`${moment()}: ${req.originalUrl}`);
    next();
});

router.use("/fees", feeRoute);
router.use("/compute-transaction-fee", computeRoute);


router.get("/", (req, res) => {
    successMessageWelcome(res, `Welcome to the Flutterwave-Lannister API - v${apiVersion}`);
});

module.exports = router; 