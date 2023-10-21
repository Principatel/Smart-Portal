import React, { useState } from "react";
import "../../Styles/dashboard/createlist.css";
import { crossSendInstance } from "../../Helpers/ContractInstance";
import { getDestChainAddress } from "../../Helpers/DestChainAddresses";
import { getTokenBalance } from "../../Helpers/TokenBalance";
import { getGasFees } from "../../Helpers/getGasEstimation";
import { approveToken } from "../../Helpers/ApproveToken";

import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";

function Createlist() {
  const { address, isConnected } = useAccount();
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
      group.gasFees = gasFees * 1000000000;
    });

    // Wait for all promises to complete before returning the result
    await Promise.all(promises);

    const groupedDataArray = Object.values(groupedData);
    return groupedDataArray;
  }

  const tokenBalance = async (totalTokenAmount) => {
    console.log(address);
    const balance = await getTokenBalance(address);
    const userTokenBalance = Math.floor(
      (Number(balance._hex) / 1e6).toFixed(6),
      2
    );
    console.log("user balance:", userTokenBalance);
    console.log("token to transfer:", totalTokenAmount);
    const val = userTokenBalance - totalTokenAmount;
    if (userTokenBalance < totalTokenAmount) {
      alert(
        `Token exceeded.You don't have enough Token, you aUSDC balance is ${userTokenBalance} aUSDC and your total transfer amount is ${totalTokenAmount} aUSDC`
      );
      return false;
    } else {
      return true;
    }
  };

  const executeTransaction = async () => {
    console.log(listData);

    processListData(listData)
      .then(async (groupedData) => {
        console.log(groupedData);

        //get total gas fees
        const totalGasFees = groupedData.reduce((sum, item) => {
          return sum + (item.gasFees || 0); // Ensure gasFees is a number, add it to the sum
        }, 0);
        console.log(totalGasFees);

        //get total token amount
        const totalTokenAmount = groupedData.reduce((sum, group) => {
          const groupTotal = group.amounts.reduce((acc, amount) => {
            // Convert BigNumber to decimal with six decimal places
            const decimalAmount = Number(amount.toString()) / 1e6;
            return acc + decimalAmount;
          }, 0);
          return sum + groupTotal;
        }, 0);

        const procced = await tokenBalance(totalTokenAmount);

        if (procced) {
          console.log("Total Amounts:", totalTokenAmount);
          console.log(ethers.utils.parseUnits(totalTokenAmount.toString(), 6));

          await approveToken(totalTokenAmount.toString());
          // const con = await crossSendInstance();
          // const txsendPayment = await con.sendPayment(groupedData, {
          //   value: totalGasFees,
          // });

          // const receipt = await txsendPayment.wait();
          // console.log("Transaction receipt:", receipt);
        }
      })
      .catch((error) => {
        console.error(error);
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
          </div>
        ) : (
          <h3>Your Transactions list will be listed here!!</h3>
        )}
      </div>
    </div>
  );
}

export default Createlist;
