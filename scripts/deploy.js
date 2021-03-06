const {
    ethers
} = require("hardhat");
const dayJs = require("dayjs");
const UtcDate = require('dayjs/plugin/utc');
dayJs.extend(UtcDate);

const {
    rainTokenMainnetContract,
    walletAddress,
    maxPreSaleContribution,
    preSaleRate
} = require('../secrets.json')

// scripts/deploy.js
async function main() {
    // ethers is avaialble in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );


    // const RainToken = await ethers.getContractFactory("RainToken");
    // console.log("Deploying Rain Token...");

    // const rainToken = await upgrades.deployProxy(RainToken, ['Rain.Credit', 'RAIN'], {
    //     initializer: 'initialize'
    // });

    // Deploy Rain Token to contract
    // const rainToken = await RainToken.deploy('Rain.Credit', 'RAIN');
    // const token = await rainToken.deployed();
    // console.log("Rain token deployed to:", token.address);
    const RainPrivateSale = await ethers.getContractFactory("RainPrivateSale");

    // Deploy Rain Private Sale Contract
    const rainPrivateSale = await RainPrivateSale.deploy(
        preSaleRate,
        walletAddress,
        rainTokenMainnetContract,
        maxPreSaleContribution,
        getTimeInSeconds(600),
        getTimeInSeconds(2040)
    );
    await rainPrivateSale.deployed();
    console.log('Crowd sale contract deployed to:', rainPrivateSale.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


function getTimeInSeconds(minutes = 1) {
    const seconds = dayJs().utc().add(minutes, 'minute').valueOf() / 1000;
    return Math.round(seconds);
}