import { Request, Response } from "express";
import {
  generatePrivateKeyFromMnemonic,
  generateWallet,
  Wallet,
  Currency
} from "@tatumio/tatum";
import { cryptoSymbol } from "crypto-symbol";
const { nameLookup } = cryptoSymbol({});

import instance from "../4-Services/axios.service";

const getAll = async (req: Request, res: Response) => {
  const wallet = await instance.get("/polygon/wallet");
  res.json(wallet.data);
};

const createWallet = async (req: Request, res: Response) => {
  const { currency } = req.body;
  try {
    // const wallet: any = await generateWallet(currency, true);
    const cep = nameLookup(currency).toString().split(" ")[0].toLowerCase(); // currncy end point
    // const cep = ""
    console.log(cep);
    const wallet = await (await instance.get(`/${cep}/wallet`)).data;
    // console.log(wallet);
    const private_key = await (await instance.post(`/${cep}/wallet/priv`, {
      index: 1,
      mnemonic: wallet.mnemonic
    })).data.key;
    // console.log(wallet);
    // console.log(cep);
    // const cep = "bnb";

    // console.log(private_key);
    const address = await instance.get(`/${cep}/address/${wallet.xpub}/1`);
    const wallet_address = address.data.address;
    const public_key = wallet.xpub;
    res.send({ wallet_type: cep, wallet_address, public_key, private_key });
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
};

const transaction = async (req: Request, res: Response) => {
  const { currency, data, to, amount, fromPrivateKey } = req.body;
  try {
    const cep = nameLookup(currency).toString().toLowerCase(); // currncy end point
    const transaction = await instance.post(`/${cep}/transaction`, {
      data,
      to,
      currency,
      amount,
      fromPrivateKey
    });
    res.send(transaction.data);
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
};
const trackTransaction = async (req: Request, res: Response) => {
  const { currency, hash } = req.params;
  try {
    const cep = nameLookup(currency).toString().toLowerCase(); // currncy end point
    const transaction = await instance.get(`/${cep}/transaction/${hash}`);
    res.send(transaction.data);
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
};
const getAllTransactions = async (req: Request, res: Response) => {
  const { currency, address } = req.params;
  try {
    const cep = nameLookup(currency).toString().toLowerCase(); // currncy end point
    const transaction = await instance.get(
      `/${cep}/account/transaction/${address}?pageSize=20` //page size is required, update in future updated
    );
    res.send(transaction.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const getWalletBalance = async (req: Request, res: Response) => {
  const { currency, address } = req.params;
  try {
    const cep = nameLookup(currency).toString().toLowerCase(); // currncy end point
    const balance = await instance.get(`/${cep}/account/balance/${address}`);
    res.send(balance.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const deploySmartContract = async (req: Request, res: Response) => {
  const { currency, key } = req.body;
  try {
    const contract = await instance.post("/blockchain/token/deploy", {
      chain: currency,
      name: "TEST",
      symbol: "TEST",
      fromPrivateKey: key
    });
    res.send(contract.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export {
  getAll,
  createWallet,
  deploySmartContract,
  transaction,
  trackTransaction,
  getAllTransactions,
  getWalletBalance
};
