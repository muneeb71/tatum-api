"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tatum_1 = __importDefault(require("./1-Routes/tatum"));
const index_1 = __importDefault(require("./1-Routes/index"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/", index_1.default);
app.use("/tatum", tatum_1.default);
app.listen(PORT, () => console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`));
