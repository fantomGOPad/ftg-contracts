import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";

describe("BoostPool", function () {
  it("Should Test", async function () {
    const now = new Date();
    const duration = 5 * 24 * 60 * 60;
    const stakeToken = ""
    const yieldToken = ""
    const maxYield = 0;
    const maxStake = 0;
    const maxPerStake = 0;
    const rewardSteps: number[] = [];
    const stakeSteps: number[] = [];
    const rewardQuote: number[] = [];
    const BoostPool = await ethers.getContractFactory('BoostPool');
    const boostPool = await BoostPool.deploy(+now / 1000, duration, stakeToken, yieldToken, maxYield, maxStake, maxPerStake, rewardSteps, stakeSteps, rewardQuote);
    await boostPool.deployed();
    console.log("boostPool deployed to ", boostPool.address)

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
