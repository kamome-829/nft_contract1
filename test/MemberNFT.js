const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("memberNFTコントラクト", function(){
    let MemberNFT;
    let memberNFT;
    const name = "MemberNFT"
    const symbol = "MEM";
    let owner;

    beforeEach(async function(){
        [ owner ] = await ethers.getSigners();
        MemberNFT = await ethers.getContractFactory("MemberNFT");
        memberNFT = await MemberNFT.deploy();
        await memberNFT.deployed();
    });

    it("トークンの名前とシンボルのセット", async function(){

        expect(await memberNFT.name()).to.equal(name);
        expect(await memberNFT.symbol()).to.equal(symbol);

    });
    it("デプロイアドレスがオーナーに設定されるべき", async function(){

        expect(await memberNFT.owner()).to.equal(owner.address);
    });
})