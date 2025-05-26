//TheBlockchainCoders = 0x5FbDB2315678afecb367f032d93F642f64180aa3
//TokenSale = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

//JSON FILE
import TheBlockchainCoders from './TheBlockchainCoders.json';
import TokenSale from './TokenSale.json';

//OWNER OF THE CONTRACT
export const OWNER_ADDRESS="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

//TOKEN
export const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const TOKEN_ABI = TheBlockchainCoders.abi;

//TOKEN SALE
export const TOKEN_SALE_ADDRESS ="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const TOKEN_SALE_ABI = TokenSale.abi;

const networks = {
    localhost: {
        chainId: `0x${Number(31337).toString(16)}`,
        chainName: "localhost",
        nativeCurrency:{
            name: "GO",
            symbol: "GO",
            decimals: 18,
        },
        rpcUrls: ["http://127.0.0.1:8545/"],
        blockExplorerUrls: ["https://bscscan.com"], 
    },
};

export const handleNetworkSwitch = async () => {
    const networkName ="localhost";
    await changeNetwork({networkName});
};