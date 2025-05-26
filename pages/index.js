import React from "react";

//INTERNAL IMPORT
import{useStateContext} from "../Context/index";
import { 
  About,
  ArrowUp,
  Banner,
  Blog,
  Client,
  Contact,
  Distribution,
  Faq,
  Footer,
  Header,
  Loader,
  MobileApp,
  Service,
  Team,
  TimeLine,
  TokenSale,
} from "../Components/index";
const index = () => {

  const {
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
    loader,
  } = useStateContext();
  return( 
    <div className="v_dark">
      <Header 
       address={address} 
       setAddress={setAddress} 
       connectWallet={connectWallet} 
      />
      <Banner
       transferNativeToken={transferNativeToken}
       updateTokenSupplySale={updateTokenSupplySale} 
      />
      <Service/>
      <About/>
      <TokenSale
       buyToken={buyToken}
       tokenSale={tokenSale} 
      />
      <Distribution/>
      <MobileApp/>
      <Contact/>
      <Footer/>
      {loader && <Loader/>}

    </div>
  );  
};

export default index;
