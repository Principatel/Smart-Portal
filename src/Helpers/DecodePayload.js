import crossSendABI from "../artifacts/contracts/CrossSender.sol/CrossSender.json";
import { ethers } from "ethers";

export const decode = async (payload) => {
  // Create an interface with the ABI
  const iface = new ethers.utils.Interface(crossSendABI.abi);
  const PaymentDataStruct = [
    { name: "receivers", type: "address[]" },
    { name: "amounts", type: "uint256[]" },
  ];
  const decodedData = ethers.utils.defaultAbiCoder.decode(
    PaymentDataStruct,
    payload
  );
  console.log(decodedData);
};
