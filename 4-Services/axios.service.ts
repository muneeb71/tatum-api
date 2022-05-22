import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-eu1.tatum.io/v3",
  headers: { "x-api-key": "4aefa948-f2e8-48c3-bd41-9e0e279438ad" }
});
export = instance;
