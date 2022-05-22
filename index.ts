import express, { Express } from "express";

import tatumRouter from "./1-Routes/tatum";
import indexRouter from "./1-Routes/index";
const app: Express = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use("/tatum", tatumRouter);

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
);
