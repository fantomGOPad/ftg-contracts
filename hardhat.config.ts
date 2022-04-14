import { task } from "hardhat/config";
import * as dotenv from "dotenv";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
dotenv.config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      // chainId: 1337,
      chainId: 31337,
    },
    ganash: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "7d983fceaf552aa34abe865a784d1ccb7f7c92d378de4d72e78dd1d8759515f0",
      ],
    },
  },
};
