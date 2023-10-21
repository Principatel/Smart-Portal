import React, { useState } from "react";
import "../../Styles/dashboard/createlist.css";
import { crossSendInstance } from "../../Helpers/ContractInstance";
import { getDestChainAddress } from "../../Helpers/DestChainAddresses";
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

    for (const item of listData) {
      const { chainName, receiverAddress, tokenAmount, tokenSymbol } = item;

      if (!groupedData[chainName]) {
        groupedData[chainName] = {
          receivers: [],
          amounts: [],
          destChain: "",
          detContractAddress: "",
          tokenSymbol: [],
        };
      }

      const group = groupedData[chainName];
      group.receivers.push(receiverAddress);
      group.amounts.push(tokenAmount);
      group.destChain = chainName;
      group.detContractAddress = await getDestChainAddress(chainName);
      group.tokenSymbol = tokenSymbol;
    }

    const groupedDataArray = Object.values(groupedData);
    return groupedDataArray;
  }

  const executeTransaction = async () => {
    console.log(listData);

    processListData(listData)
      .then((groupedData) => {
        console.log(groupedData);
      })
      .catch((error) => {
        console.error(error);
      });

    // const groupedDataArray = Object.values(groupedData);

    // const chainAddress = await getDestChainAddress(listData[0].chainName);
    // console.log("address", chainAddress);
    // const con = await crossSendInstance();
    // const txsendPayment = await con.sendPayment();
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
