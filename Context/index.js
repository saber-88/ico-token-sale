import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import {
    CheckIfWalletConnected,
    connectWallet,
    connectingTOKENCONTRACT,
    getBalance,
    connectingTOKEN_SALE_CONTRACT,
} from "../Utils/index";
import {TOKEN_SALE_ADDRESS, OWNER_ADDRESS} from './constants';


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const notifySuccess = (msg) => toast.success(msg, {duration:2000});
    const notifyError = (msg) => toast.error(msg, {duration:2000});

    // const TOKEN_ICO = "TOKEN SALE DAPP";

    // STATE VARIABLES
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [nativeToken, setNativeToken] = useState("");
    const [tokenHolders, setTokenHolders] = useState([]);
    const [tokenSale, setTokenSale] = useState("");
    const [currentHolder, setCurrentHolder] = useState("");
    const [loader, setLoader] = useState(false);

    // FETCH CONTRACT DATA

    const fetchInitialData = async () => {
        try {
            //GET USER DATA
            const account = await CheckIfWalletConnected();
            //GET USER BALANCE 
            const balance = await getBalance();
            setBalance(ethers.utils.formatEther(balance.toString()));
            setAddress(account);

            //TOKEN CONTRACT
            const TOKEN_CONTRACT = await connectingTOKENCONTRACT();
            let tokenBalance;
            if (account) {
                tokenBalance = await TOKEN_CONTRACT.balanceOf(account);
            } else {
                tokenBalance = 0;
            }

            //GET ALL TOKEN DATA
            const tokenName = await TOKEN_CONTRACT.name();
            const tokenSymbol = await TOKEN_CONTRACT.symbol();
            const tokenTotalSupply = await TOKEN_CONTRACT.totalSupply();
            const tokenStandard = await TOKEN_CONTRACT.standard();
            const tokenHolders = await TOKEN_CONTRACT._userId();
            const tokenOwnerOfContract = await TOKEN_CONTRACT.ownerOfContract();
            const tokenAddress = await TOKEN_CONTRACT.address;

            const nativeToken = {
                tokenAddress: tokenAddress,
                tokenName: tokenName,
                tokenSymbol: tokenSymbol,
                tokenOwnerOfContract: tokenOwnerOfContract,
                tokenStandard: tokenStandard,
                tokenTotalSupply: ethers.utils.formatEther(tokenTotalSupply.toString()),
                tokenBalance: ethers.utils.formatEther(tokenBalance.toString()),
                tokenHolders: tokenHolders.toNumber(),
            };

            setNativeToken(nativeToken);

            //GETTING TOKEN HOLDERS
            const getTokenHolder = await TOKEN_CONTRACT.getTokenHolder();
            setTokenHolders(getTokenHolder);

            // GETTING TOKEN HOLDERS DATA
            if (account) {
                const getTokenHolderData = await TOKEN_CONTRACT.getTokenHolderData(account);
                const currentHolder = {
                    tokenId: getTokenHolderData[0].toNumber(),
                    from: getTokenHolderData[1],
                    to: getTokenHolderData[2],
                    totalToken: ethers.utils.formatEther(getTokenHolderData[3].toString()),
                    tokenHolder: getTokenHolderData[4],
                };

                setCurrentHolder(currentHolder);
            }

            //TOKEN SALE CONTRACT
            const TOKEN_SALE_CONTRACT = await connectingTOKEN_SALE_CONTRACT()
            const tokenPrice = await TOKEN_SALE_CONTRACT.tokenPrice();
            const tokenSold = await TOKEN_SALE_CONTRACT.tokensSold();
            const tokenSupply = await TOKEN_SALE_CONTRACT.totalTokenSupply();
            const tokenSaleBalance = await TOKEN_CONTRACT.balanceOf(TOKEN_SALE_ADDRESS);

            const tokenSale = {
                tokenPrice: ethers.utils.formatEther(tokenPrice.toString()),
                tokenSold: tokenSold.toNumber(),
                tokenSaleBalance: ethers.utils.formatEther(tokenSaleBalance.toString()),
                totalTokenSupply: ethers.utils.formatEther(tokenSupply.toString()),
            };

            setTokenSale(tokenSale);

            console.log(tokenSale);
            console.log(currentHolder);
            console.log(nativeToken);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    //BUY TOKEN 
    const buyToken = async (nToken) => {
        try {
            notifySuccess("Transaction processing, please wait..");
            setLoader(true);
            const amount = ethers.utils.parseUnits(nToken.toString(), "ether");
            const contract = await connectingTOKEN_SALE_CONTRACT();

            const buying = await contract.buyToken(nToken, {
                value: amount.toString(),
            });

            await buying.wait();
            console.log(buying);
            setLoader(false)
            notifySuccess("Transaction completed successfully")
            window.location.reload();
        } catch (error) {
            setLoader(false);
            notifyError("Transaction failed , try after some time, and check block explorer");
            console.log(error)
        }
    };

    //NATIVE TOKEN TRANSFER
    const transferNativeToken = async () => {
        try {
            const account = await CheckIfWalletConnected();
            if (account != OWNER_ADDRESS.toLowerCase())
                return notifyError("You are not the owner");
            notifySuccess("Transaction processing, please wait..")
            setLoader(true);

            const TOKEN_AMOUNT = 1000;
            const tokens = TOKEN_AMOUNT.toString();
            const transferAmount = ethers.utils.parseEther(tokens);

            const contract = await connectingTOKENCONTRACT();
            const transaction = await contract.transfer(
                TOKEN_SALE_ADDRESS,
                transferAmount
            );
            console.log(contract);

            await transaction.wait();
            console.log(transaction);
            setLoader(false);
            notifySuccess("Transaction completed successfully")
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const updateTokenSupplySale = async () => {
        try {
            const account = await CheckIfWalletConnected();
            if (account != OWNER_ADDRESS.toLowerCase())
                return notifyError("You are not the owner");
            notifySuccess("Transaction processing, please wait..");
            setLoader(true);

            const contract = await connectingTOKEN_SALE_CONTRACT();
            const tokenSupply = await contract.totalTokenSupply();

            const updating = ethers.utils.formatEther(tokenSupply.toString());
            const supply = 1000 +updating * 1;
            const amount = ethers.utils.parseUnits(supply.toString(),"ether");

            const transaction = await contract.updateSupply(amount);
            console.log(contract);

            await transaction.wait();
            console.log(transaction);
            setLoader(false);
            notifySuccess("Transaction completed successfully");
            window.location.reload();
        } catch (error) {
            notifyError("Transaction failed, try after some time, and check block explorer");
            setLoader(false);
            console.log(error);
        }
    }

    return (
        <StateContext.Provider value={{
            transferNativeToken,
            updateTokenSupplySale,
            buyToken,
            connectWallet,
            setAddress,
            // TOKEN_ICO, 
            currentHolder, 
            tokenSale, 
            tokenHolders,
            nativeToken, 
            balance, 
            address,
             }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);