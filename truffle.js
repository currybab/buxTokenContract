require("dotenv").config();
const web3Utils = require("web3-utils");
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = [process.env.PRIVATEKEY];

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 7545,
            network_id: "*" // eslint-disable-line camelcase
        },
        kovan: {
            provider: () =>
                new HDWalletProvider(
                    privateKeys,
                    "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY
                ),
            network_id: 42,
            gasPrice: web3Utils.toWei("50", "gwei"),
            gas: 4700000
        }
    }
};