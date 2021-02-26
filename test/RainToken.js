const {
    expect
} = require("chai");
const {
    ethers
} = require("hardhat");

describe("Rain token contract", () => {
    let RainToken;
    let rainToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    beforeEach(async () => {
        RainToken = await ethers.getContractFactory("RainToken");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        rainToken = await RainToken.deploy('Rain.Credit', "RAIN");
        await rainToken.deployed();
    })

    describe("Deployed to correct owner", async () => {
        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await rainToken.balanceOf(owner.address);
            expect(await rainToken.totalSupply()).to.equal(ownerBalance)
        })
    })
})