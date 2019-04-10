// const { expectThrow } = require("../helpers/expectThrow");
// const { EVMRevert } = require("../helpers/EVMRevert");
const BuxToken = artifacts.require("BuxToken");
const BN = web3.utils.BN;
require("chai").use(require("chai-bn")(BN)).should();

contract("BuxToken", function([_, owner, investor]) {
    let token;
    const _name = "BuxToken2019";
    const _symbol = "BUX2019";
    const _decimals = new BN(0);
    const _total_supply = new BN(250);
    const _over_total_supply = new BN(250);

    beforeEach(async function() {
        token = await BuxToken.new(_name, _symbol, _decimals, _total_supply, {
from: owner
        });
    });

    it("has a name", async function() {
        (await token.name()).should.eq(_name);
    });

    it("has a symbol", async function() {
        (await token.symbol()).should.eq(_symbol);
    });

    it("has 0 decimal", async function() {
        (await token.decimals()).should.be.bignumber.equal(_decimals);
    });

    it("has " + String(250) + " total supply", async function() {
        (await token.totalSupply()).should.be.bignumber.equal(_total_supply);
    });

    it("assigns the initial total supply to the creator", async function() {
        const totalSupply = await token.totalSupply();
        const ownerBalance = await token.balanceOf(owner);
        ownerBalance.should.be.bignumber.equal(totalSupply);
    });

    it("transfer token to the investor(owner balance check)", async function() {
        await token.transfer(investor, 1, { from: owner });
        const ownerBalance = await token.balanceOf(owner);
        // console.error(ownerBalance);
        ownerBalance.should.be.bignumber.equal(new BN(249));
    });

    it("transfer token to the investor(investor balance check)", async function() {
        await token.transfer(investor, 1, { from: owner });
        const investorBalance = await token.balanceOf(investor);
        // console.error(investorBalance);
        investorBalance.should.be.bignumber.equal(new BN(1));
    });

    // it("should reject transfer token(more than has) to the investor", async function() {
    // await expectThrow(
    // token.transfer(investor, _over_total_supply, { from: owner }),
    // EVMRevert
    // );
    // });
});