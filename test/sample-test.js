const { JsonRpcBatchProvider } = require("@ethersproject/providers");
const { getByLabelText } = require("@testing-library/react");
const { expect } = require("chai");
const { ethers, hardhatArguments } = require("hardhat");
const { fullList } = require("npm");
const { hrtime } = require("process");
const { HashRouter } = require("react-router-dom");
const { boltx } = require("web3modal/dist/providers/connectors");
const { NIFTY } = require("web3modal/dist/providers/injected");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});


