import { Router } from "express";
import {
  createWallet,
  getAll,
  deploySmartContract,
  transaction,
  trackTransaction,
  getAllTransactions,
  getWalletBalance
} from "../2-Controller/tatum";
const router = Router();
// router.get("/", getAll);
router.get("/", createWallet);
router.post("/transaction", transaction); //perform transaction & tranfer funds
router.get("/transaction/:currency/:hash", trackTransaction); // Track Transaction by Hash
router.get("/account/:currency/:address", getAllTransactions); // Get all transactions of address // endpoint accept large number of params, page size is required
router.get("/balance/:currency/:address", getWalletBalance); // Get all transactions of address // endpoint accept large number of params, page size is required
router.post("/dsc", deploySmartContract); //deploy smart contract

export default router;
