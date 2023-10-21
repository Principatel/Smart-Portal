import React, { useState } from "react";
import "../../Styles/dashboard/createlist.css";
import { crossSendInstance } from "../../Helpers/ContractInstance";
import { getDestChainAddress } from "../../Helpers/DestChainAddresses";
import { ethers } from "ethers";
import axios from "axios";

function Createlist() {
  const [listData, setListData] = useState([]);
  const [formData, setFormData] = useState({
    receiverAddress: "",
    tokenAmount: "",
    tokenSymbol: "",
    chainName: "Polygon",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClick = () => {
    if (
      formData.receiverAddress.trim() === "" ||
      formData.tokenAmount.trim() === "" ||
      formData.tokenSymbol.trim() === "" ||
      formData.chainName.trim() === ""
    ) {
      alert("Please fill in all fields before adding to the list.");
      return;
    }

    setListData([...listData, formData]);
    setFormData({
      receiverAddress: "",
      tokenAmount: "",
      tokenSymbol: "",
      chainName: formData.chainName,
    });
  };

  async function processListData(listData) {
    const groupedData = {};

    // Create an array of promises for fetching destination addresses and gas fees
    const promises = listData.map(async (item) => {
      const { chainName, receiverAddress, tokenAmount, tokenSymbol } = item;

      if (!groupedData[chainName]) {
        groupedData[chainName] = {
          receivers: [],
          amounts: [],
          destChain: "",
          detContractAddress: "",
          tokenSymbol: [],
          gasFees: 0,
        };
      }

      const group = groupedData[chainName];
      group.receivers.push(receiverAddress);
      group.amounts.push(ethers.utils.parseUnits(tokenAmount, 6));
      group.destChain = chainName;

      // Use Promise.all to concurrently fetch data for each item
      const [destChainAddress, gasFees] = await Promise.all([
        getDestChainAddress(chainName),
        getGasFees(chainName),
      ]);

      group.detContractAddress = destChainAddress;
      group.tokenSymbol = tokenSymbol;
      group.gasFees = gasFees;
    });

    // Wait for all promises to complete before returning the result
    await Promise.all(promises);

    const groupedDataArray = Object.values(groupedData);
    return groupedDataArray;
  }

  const executeTransaction = async () => {
    console.log(listData);

    processListData(listData)
      .then(async (groupedData) => {
        console.log(groupedData);
        const totalGasFees = groupedData.reduce((sum, item) => {
          return sum + (item.gasFees || 0); // Ensure gasFees is a number, add it to the sum
        }, 0);
        console.log(totalGasFees);
        // const con = await crossSendInstance();
        // const txsendPayment = await con.sendPayment(groupedData);

        // const receipt = await txsendPayment.wait();
        // console.log("Transaction receipt:", receipt);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getGasFees = async (destinationChain) => {
    return new Promise(async (resolve, reject) => {
      // Define the parameters
      const parameters = {
        method: "estimateGasFee",
        sourceChain: "scroll",
        destinationChain: destinationChain,
        gasLimit: "700000",
        gasMultiplier: "1.1",
        minGasPrice: "0",
        sourceTokenSymbol: "aUSDC",
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

  return (
    <div>
      <div className="user-form-for-list">
        <input
          className="each-input-of-create-list"
          type="text"
          name="receiverAddress"
          value={formData.receiverAddress}
          placeholder="Enter Receiver Address"
          onChange={handleInputChange}
        />
        <input
          className="each-input-of-create-list"
          type="number"
          name="tokenAmount"
          value={formData.tokenAmount}
          placeholder="Enter Token Amount"
          onChange={handleInputChange}
        />
        <input
          className="each-input-of-create-list"
          type="text"
          name="tokenSymbol"
          value={formData.tokenSymbol}
          placeholder="Enter Token Symbol"
          onChange={handleInputChange}
        />
        {/* <input
          className="each-input-of-create-list"
          type="text"
          name="chainName"
          value={formData.chainName}
          placeholder="Enter Chain name"
          onChange={handleInputChange}
        /> */}
        <select
          className="each-input-of-create-list"
          name="chainName"
          value={formData.chainName}
          onChange={handleInputChange}
        >
          <option value="Polygon">Polygon</option>
          <option value="ethereum-2">Ethereum</option>
          <option value="Avalanche">Avalanche</option>
          <option value="Moonbeam">Moonbeam</option>
          <option value="arbitrum">Arbitrum</option>
        </select>
        <button className="button-to-add-form-data" onClick={handleAddClick}>
          Add to List
        </button>
      </div>
      <div className="div-to-add-the-tx">
        {listData.length > 0 ? (
          <div>
            <h1>Your Transaction Lineup</h1>
            <div className="scrollable-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Receive Address</th>
                    <th>Token Amount</th>
                    <th>Token Symbol</th>
                    <th>Chain Name</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.receiverAddress}</td>
                      <td>{data.tokenAmount}</td>
                      <td>{data.tokenSymbol}</td>
                      <td>{data.chainName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="send-button"
              onClick={() => {
                executeTransaction();
              }}
            >
              Begin Payment
            </button>
            <button onClick={() => getGasFees()}>Gasssss</button>
          </div>
        ) : (
          <h3>Your Transactions list will be listed here!!</h3>
        )}
      </div>
    </div>
  );
}

export default Createlist;
