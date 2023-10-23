import axios from "axios";

export const getSentTransaction = async (address) => {
  return new Promise(async (resolve, reject) => {
    // Define the parameters
    const parameters = {
      method: "searchGMP",
      size: 20,
      senderAddress: "0xe57f4c84539a6414C4Cf48f135210e01c477EFE0",
      sourceContractAddress: "0x05c106CaD72b04c09F228286fEd949eC6f9539a7",
    };

    // Define the API endpoint
    const apiUrl = "https://testnet.api.gmp.axelarscan.io";

    try {
      // Make the POST request
      const response = await axios.post(apiUrl, parameters);

      // Handle the response data here
      const gasFees = response.data; // Assuming the response contains gas fee data

      resolve(gasFees);
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
      reject(error);
    }
  });
};
