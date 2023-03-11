import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv"

dotenv.config({path: __dirname + '/.env'})

const deployer = process.env.DEPLOYER_KEY

if(!deployer){
  throw new Error("Please set your deployer private key in a .env file")
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks:{

    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [deployer],
    }
  },
  etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;
