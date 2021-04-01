// import { expect } from "chai";
// import { Signer } from "ethers";
// import { ethers } from "hardhat";
// // import { Greeter } from "../artifacts/contracts/Greeter.sol"
// import { Greeter } from "../types/Greeter";

// describe("Greeter", function() {
//   it("Should return the new greeting once it's changed", async function() {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!") as Greeter;
    
//     await greeter.deployed();
//     expect(await greeter.greet()).to.equal("Hello, world!");

//     await greeter.setGreeting("Hola, mundo!");
//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

// describe("Token", function () {
//   let accounts: Signer[];

//   beforeEach(async function () {
//     accounts = await ethers.getSigners();
//   });

//   it("should do something right", async function () {
//     // Do something with the accounts
//   });
// });
