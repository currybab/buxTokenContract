const BuxToken = artifacts.require("./BuxToken.sol");
const _name = "Bux 2019 Token";
const _symbol = "BUX2019";
const _decimals = 0;
const _total_supply = 250;

module.exports = function(deployer) {
    deployer.deploy(BuxToken, _name, _symbol, _decimals, _total_supply);
};