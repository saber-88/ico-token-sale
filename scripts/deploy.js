const hre = require("hardhat");

const tokens = (nToken)=>{
    return ethers.utils.parseUnits(nToken.toString(), "ether");
};

async function main(){
    //DEPLOY TOKEN CONTRACT
    const _initialSupply = tokens(50000000);

    const TheBlockchainCoders = await hre.ethers.getContractFactory("TheBlockchainCoders");

    const theBlockchainCoders = await TheBlockchainCoders.deploy(_initialSupply);

    await theBlockchainCoders.deployed();
    console.log(`TheBlockchainCoders: ${theBlockchainCoders.address}`);

    // TOKEN SALE CONTRACT
    const _tokenPrice = tokens(1);
    const _totalSupply = tokens(1000);

    const TokenSale = await hre.ethers.getContractFactory("TokenSale");
    const tokenSale = await TokenSale.deploy(
        theBlockchainCoders.address,
        _tokenPrice,
        _totalSupply
    );

    await tokenSale.deployed();
    console.log(`TokenSale: ${tokenSale.address}`)
}

main().catch((error)=> {
    console.error(error);
    process.exitCode = 1;
});


// npx hardhat run scripts/deploy.js --network localhost