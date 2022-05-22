"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tatum_1 = require("../2-Controller/tatum");
const router = (0, express_1.Router)();
// router.get("/", getAll);
router.get("/", tatum_1.createWallet);
router.post("/transaction", tatum_1.transaction); //perform transaction & tranfer funds
router.get("/transaction/:currency/:hash", tatum_1.trackTransaction); // Track Transaction by Hash
router.get("/account/:currency/:address", tatum_1.getAllTransactions); // Get all transactions of address // endpoint accept large number of params, page size is required
router.get("/balance/:currency/:address", tatum_1.getWalletBalance); // Get all transactions of address // endpoint accept large number of params, page size is required
router.post("/dsc", tatum_1.deploySmartContract); //deploy smart contract
exports.default = router;
