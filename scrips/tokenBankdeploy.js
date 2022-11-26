const fs = require("fs");
const memberNFTAddress = require("../memberNFTContract");

const main = async() =>{
    const addr1 ="0xEBD831aA0343789150Cdffce067479Bb848C5aC8";
    const addr2 ="0xeD8c9C09962bD5A51F4c42Fe9e50d6327C8b9321";
    const addr3 ="0x4CFaFBcE67942e79Edb1dd67eccC271a536D202D";
    const addr4 ="0x6aA26bae599c30a8293Ee37B04a4610B2EbB027E";

    //デプロイ
    const TokenBank = await ethers.getContractFactory("TokenBank");
    const tokenBank = await TokenBank.deploy("TokenBank", "TBK", memberNFTAddress );
    await tokenBank.deployed();
    console.log(`Contract deployde to: https://goerli.etherscan.io/address/${tokenBank.address}`);

    //トークンを移転

    let tx = await tokenBank.transfer(addr2, 300);
    await tx.wait();
    console.log("transferred to addr2");
    tx = await tokenBank.transfer(addr3, 200);
    await tx.wait();
    console.log("transferred to addr3");
    tx = await tokenBank.transfer(addr4, 100);
    await tx.wait();
    console.log("transferred to addr4");

    // Verifyで読み込むargument.jsを生成
    fs.writeFileSync("./argument.js",
    `
    module.exports = [
        "TokenBank",
        "TBK",
        "${memberNFTAddress}"
    ]
    `
    );

    // フロントエンドが読み込むcontracts.jsを生成
    fs.writeFileSync("./contracts.js",
    `
    export const memberNFTAddress = "${memberNFTAddress}"
    export const tokenBankAddress = "${tokenBank.address}"
    `
    );
}

const tokenBankDeploy = async () =>{
    try{
        await main();
        process.exit(0);
    } catch(err){
        console.log(err);
        process.exit(1);
    }
};

tokenBankDeploy();