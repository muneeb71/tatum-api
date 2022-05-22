"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: "https://api-eu1.tatum.io/v3",
    headers: { "x-api-key": "4aefa948-f2e8-48c3-bd41-9e0e279438ad" }
});
module.exports = instance;
