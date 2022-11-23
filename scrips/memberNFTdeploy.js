const fs = require("fs");

const main = async() =>{
    const addr1 ="0xEBD831aA0343789150Cdffce067479Bb848C5aC8";
    const addr2 ="0xeD8c9C09962bD5A51F4c42Fe9e50d6327C8b9321";
    const addr3 ="0x4CFaFBcE67942e79Edb1dd67eccC271a536D202D";

    const tokenURI1 = "ipfs://bafybeihmz3jesfpzd7nlwqaq753247l5drantxpuupjfqp2jjeyfcvh6we/metadata1.json";
    const tokenURI2 = "ipfs://bafybeihmz3jesfpzd7nlwqaq753247l5drantxpuupjfqp2jjeyfcvh6we/metadata2.json";
    const tokenURI3 = "ipfs://bafybeihmz3jesfpzd7nlwqaq753247l5drantxpuupjfqp2jjeyfcvh6we/metadata3.json";
    const tokenURI4 = "ipfs://bafybeihmz3jesfpzd7nlwqaq753247l5drantxpuupjfqp2jjeyfcvh6we/metadata4.json";
    const tokenURI5 = "ipfs://bafybeihmz3jesfpzd7nlwqaq753247l5drantxpuupjfqp2jjeyfcvh6we/metadata5.json";

    MemberNFT = await ethers.getContractFactory("MemberNFT");
    memberNFT = await MemberNFT.deploy();
    await memberNFT.deployed();

    console.log(`Contract deployde to: https://goerli.etherscan.io/address/${memberNFT.address}`)

    let tx = await memberNFT.nftMint(addr1, tokenURI1);
    await tx.wait();
    console.log("NFTMint 1");
    tx = await memberNFT.nftMint(addr1, tokenURI2);
    await tx.wait();
    console.log("NFTMint 2");
    tx = await memberNFT.nftMint(addr2, tokenURI3);
    await tx.wait();
    console.log("NFTMint 3");
    tx = await memberNFT.nftMint(addr2, tokenURI4);
    await tx.wait();
    console.log("NFTMint 4");

    //コントラクトアドレスの書き出し
    fs.writeFileSync("./memberNFTContract.js",
    `
    module.exports = "${memberNFT.address}"
    `
    );
}

const memberNFTDeploy = async () =>{
    try{
        await main();
        process.exit(0);
    } catch(err){
        console.log(err);
        process.exit(1);
    }
};

memberNFTDeploy();