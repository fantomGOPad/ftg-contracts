// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");
import { ethers } from "hardhat";

async function main() {
  const now = new Date();
  const nowInSec = Math.floor(+now / 1000).toFixed(0);
  const duration = 5 * 24 * 60 * 60;
  let stakeTokenAdd = "";
  let yieldTokenAdd = "";


  const maxYield = ethers.utils.parseUnits("10", "ether");
  const maxStake = ethers.utils.parseUnits("10", "ether");
  const maxPerStake = ethers.utils.parseUnits("10", "ether");


  const rewardSteps: number[] = [1, 2, 3, 4];
  const stakeSteps: number[] = [0, 1, 2, 3, 4];
  const rewardQuote: number = 1;

  console.log("nowInSec", nowInSec);

  // We get the contract to deploy
  const WToken = await ethers.getContractFactory("WToken");
  const wToken = await WToken.deploy();

  await wToken.deployed();
  stakeTokenAdd = wToken.address;

  console.log("WToken deployed to:", wToken.address);

  const YieldToken = await ethers.getContractFactory("YieldToken");
  const yieldToken = await YieldToken.deploy();
  yieldTokenAdd = yieldToken.address;

  await yieldToken.deployed();

  console.log("YieldToken deployed to:", yieldToken.address);

  const BoostPool = await ethers.getContractFactory("BoostPool");

  const boostPool = await BoostPool.deploy(
    nowInSec,
    duration,
    stakeTokenAdd,
    yieldTokenAdd,
    maxYield,
    maxStake,
    maxPerStake,
    rewardSteps,
    stakeSteps,
    rewardQuote
  );
  await boostPool.deployed();
  console.log("boostPool deployed to ", boostPool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
