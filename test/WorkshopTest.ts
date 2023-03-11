import { expect } from "chai";
import  hre, { ethers } from 'hardhat';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";

describe("WorkshopToken", function () {

  async function fixture() {
    const [deployer] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("WorkshopToken", deployer);
    const token = await Token.deploy();
    return { deployer, token };
  }
  
  it("Should comply with init state after deployment", async function () {
    
    const { deployer, token } = await loadFixture(fixture);

    expect(await token.name()).to.equal("WorkshopToken");
    expect(await token.symbol()).to.equal("WST");
    expect(await token.totalSupply()).to.equal( ethers.utils.parseEther("1000000") );
    expect(await token.balanceOf(deployer.address)).to.equal( ethers.utils.parseEther("1000000") );
  })

  it("Should burn tokens on transfer", async function () {
    
    const { deployer, token } = await loadFixture(fixture);

    const [_, addr1] = await ethers.getSigners();
    const amount = ethers.utils.parseEther("1000");

    await token.connect(deployer).transfer(addr1.address, amount);
    // It should burn 1% of transfer amount
    expect(await token.balanceOf(deployer.address)).to.equal( ethers.utils.parseEther("999000") );
    expect(await token.balanceOf(addr1.address)).to.equal( ethers.utils.parseEther("990") );

    expect(await token.totalSupply()).to.equal( ethers.utils.parseEther("999990") );
  })


})