const hre = require("hardhat");

const tokens = (nToken)=>{
    return ethers.util.parsedUints(nToken.toString(), "ehter");
};

async function main(){
    //DEPLOY TOKEN CONTRACT
    const _initialSupply = tokens(50000000);

    const TheBlockchainCoders = await hre.ethers.getContractFactory("TheBlockchainCoders");

    const theBlockchainCoders = await TheBlockchainCoders.deploy(_initialSupply);

    await theBlockchainCoders.deployed();
    console.log(`TheBlockchainCoders: ${theBLockchainCoders.address}`);

    // TOKEN SALE CONTRACT
    const _tokenPrice = tokens(1);

    const TokenSale = await hre.ehters.getContract
}