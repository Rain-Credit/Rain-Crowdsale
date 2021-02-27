// hardhat.config.js
require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-solpp");
const {
  mnemonic
} = require("./secrets.json");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.5.16",
  settings: {
    optimizer: {
      enabled: true
    }
  },
  defaultNetwork: "bscmainnet",
  networks: {
    bscmainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {
        mnemonic
      }
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s2.binance.org:8545/",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {
        mnemonic
      }
    }
  }
};