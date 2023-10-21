import { ethers } from "ethers";
import ERC20ABI from "../artifacts/contracts/ERC20.sol/ERC20.json";

export const aUSDC_token_address_scroll =
  "0x254d06f33bDc5b8ee05b2ea472107E300226659A";

export const approveToken = async (amount) => {
  const { ethereum } = window;
  if (ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(
        aUSDC_token_address_scroll,
        ERC20ABI.abi,
        signer
      );
      const aUSDC_amount = ethers.utils.parseUnits(amount, 6);
      const tx = await tokenContract.approve(
        "0x05c106CaD72b04c09F228286fEd949eC6f9539a7",
        aUSDC_amount
      );
      await tx.wait();
      console.log(`${amount} tokens Approved`);

      return true;
    } catch (error) {
      console.error("Error Approving token:", error);
    }
  }
};
