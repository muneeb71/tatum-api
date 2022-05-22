"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletBalance = exports.getAllTransactions = exports.trackTransaction = exports.transaction = exports.deploySmartContract = exports.createWallet = exports.getAll = void 0;
const crypto_symbol_1 = require("crypto-symbol");
const { nameLookup } = (0, crypto_symbol_1.cryptoSymbol)({});
const axios_service_1 = __importDefault(require("../4-Services/axios.service"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield axios_service_1.default.get("/polygon/wallet");
    res.json(wallet.data);
});
exports.getAll = getAll;
const createWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currency } = req.body;
    try {
        // const wallet: any = await generateWallet(currency, true);
        const cep = nameLookup(currency).toString().split(" ")[0].toLowerCase(); // currncy end point
        // const cep = ""
        console.log(cep);
        const wallet = yield (yield axios_service_1.default.get(`/${cep}/wallet`)).data;
        // console.log(wallet);
        const private_key = yield (yield axios_service_1.default.post(`/${cep}/wallet/priv`, {
            index: 1,
            mnemonic: wallet.mnemonic
        })).data.key;
        // console.log(wallet);
        // console.log(cep);
        // const cep = "bnb";
        // console.log(private_key);
        const address = yield axios_service_1.default.get(`/${cep}/address/${wallet.xpub}/1`);
        const wallet_address = address.data.address;
        const public_key = wallet.xpub;
        res.send({ wallet_type: cep, wallet_address, public_key, private_key });
    }
    catch (error) {
        // console.log(error);
        res.send(error);
    }
});
exports.createWallet = createWallet;
const transaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currency, data, to, amount, fromPrivateKey } = req.body;
    try {
        const cep = nameLookup(currency).toString().toLowerCase(); // currncy end point
        const transaction = yield axios_service_1.default.post(`/${cep}/transaction`, {
            data,
            to,
            currency,
            amount,
            fromPrivateKey
        });
        res.send(transaction.data);
    }
    catch (error) {
        // console.log(error);
        res.send(error);
    }
});
exports.transaction = transaction;
const trackTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currency, hash } = req.params;
    try {
        const cep = nameLookup(currency).toString().toLowerCase(); // currncy end point
        const transaction = yield axios_service_1.default.get(`/${cep}/transaction/${hash}`);
        res.send(transaction.data);
    }
    catch (error) {
        // console.log(error);
        res.send(error);
    }
});
exports.trackTransaction = trackTransaction;
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currency, address } = req.params;
    try {
        const cep = nameLookup(currency).toString().toLowerCase(); // currncy end point
        const transaction = yield axios_service_1.default.get(`/${cep}/account/transaction/${address}?pageSize=20` //page size is required, update in future updated
        );
        res.send(transaction.data);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.getAllTransactions = getAllTransactions;
const getWalletBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currency, address } = req.params;
    try {
        const cep = nameLookup(currency).toString().toLowerCase(); // currncy end point
        const balance = yield axios_service_1.default.get(`/${cep}/account/balance/${address}`);
        res.send(balance.data);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.getWalletBalance = getWalletBalance;
const deploySmartContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currency, key } = req.body;
    try {
        const contract = yield axios_service_1.default.post("/blockchain/token/deploy", {
            chain: currency,
            name: "TEST",
            symbol: "TEST",
            fromPrivateKey: key
        });
        res.send(contract.data);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.deploySmartContract = deploySmartContract;
