import { ethers } from "ethers";
import ERC20ABI from "../artifacts/contracts/ERC20.sol/ERC20.json";

export const aUSDC_token_address_scroll =
  "0x254d06f33bDc5b8ee05b2ea472107E300226659A";

export const getTokenBalance = async (address) => {
  const { ethereum } = window;
  if (ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const tokenContract = new ethers.Contract(
        aUSDC_token_address_scroll,
        ERC20ABI.abi,
        provider
      );
      const balance = await tokenContract.balanceOf(address);

      console.log(balance);
      return balance;
    } catch (error) {
      console.error("Error Fetching Token Balance:", error);
    }
  }
};
