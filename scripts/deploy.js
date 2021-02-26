const {
    ethers
} = require("hardhat");
const dayJs = require("dayjs");
const {
    rainTokenContract,
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

    // Deploy Rain Private Sale Contract
    const rainPrivateSale = await RainPrivateSol.deploy(
        preSaleRate,
        walletAddress,
        rainTokenContract,
        maxPreSaleContribution,
        getTimeInSeconds(),
        getTimeInSeconds(60)
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
    const seconds = dayJs().add(minutes, 'minute').valueOf() / 1000;
    return Math.round(seconds);
}