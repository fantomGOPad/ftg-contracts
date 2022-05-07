import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";

describe("BoostPool", function () {
  const yellow = "\x1b[33m";
  const resetColor = "\x1b[0m";
  const redColor = "\x1b[31m";
  const greenColor = "\x1b[32m";

  it("Should Test", async function () {
    const [owner, user1] = await ethers.getSigners();

    const now = new Date();
    const nowInSec = Math.floor(+now / 1000).toFixed(0);

    const duration = 5 * 24 * 60 * 60;
    let stakeTokenAdd = "";
    let yieldTokenAdd = "";
    const maxYield = ethers.utils.parseUnits("10", "ether");
    const maxStake = ethers.utils.parseUnits("10", "ether");
    const maxPerStake = ethers.utils.parseUnits("10", "ether");
    const stakeAmount = ethers.utils.parseUnits("1", "ether");
    const transferAmount = ethers.utils.parseUnits("4", "ether");
    const approveAmount = ethers.utils.parseUnits("3", "ether");

    const yTokenTransferToPool = ethers.utils.parseUnits("10", "ether");

    const rewardSteps: number[] = [1, 2, 3, 4];
    const stakeSteps: number[] = [0, 1, 2, 3, 4];
    const rewardQuote: number = 1;
    const unStakeTime = 7 * 24 * 60 * 60;

    // We get the contract to deploy
    const WToken = await ethers.getContractFactory("WToken");
    const wToken = await WToken.deploy();

    const token = await wToken.deployed();
    stakeTokenAdd = wToken.address;

    console.log("WToken deployed to:", wToken.address);

    const YieldToken = await ethers.getContractFactory("YieldToken");
    const yieldToken = await YieldToken.deploy();
    yieldTokenAdd = yieldToken.address;

    const yToken = await yieldToken.deployed();

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
    const pool = await boostPool.deployed();
    console.log("boostPool deployed to ", boostPool.address);
    console.log(greenColor);

    await token.transfer(user1.address, transferAmount);
    await yToken.transfer(boostPool.address, yTokenTransferToPool);
    console.log("transfered token to user1", transferAmount);
    console.log("transfered yToken to Pool", yTokenTransferToPool);
    const b = await token.balanceOf(user1.address);
    const yb = await yToken.balanceOf(boostPool.address);
    console.log("balance user1 token is", b);
    console.log("balance Pool yToken is", yb);
    console.log(resetColor);

    await token.connect(user1).approve(boostPool.address, approveAmount);
    const allowance = await token
      .connect(user1)
      .allowance(user1.address, boostPool.address);
    console.log("allowance user1 token is", allowance);

    await pool.connect(user1).stake(stakeAmount);
    console.log("Stake Done", stakeAmount);

    const balanceAftrStake = await token.balanceOf(user1.address);
    console.log("balance After Stake user1 token is", balanceAftrStake);
    await ethers.provider.send("evm_increaseTime", [unStakeTime]);
    await ethers.provider.send("evm_mine", []);
    console.log("Addes unStakeTime to node",unStakeTime);


    const unstake = await pool.connect(user1).unstake();
    await unstake.wait();
    const afterUnStakeTokenBalance = await token.balanceOf(user1.address);
    const afterUnStakeYTokenBalance = await yToken.balanceOf(user1.address);

    console.log(greenColor);

    console.log(
      "after UnStake Token Balance user1 token is",
      afterUnStakeTokenBalance
    );
    console.log(
      "after UnStake YToken Balance user1 token is",
      afterUnStakeYTokenBalance
    );

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
