import React, { useState } from "react";
import "../../Styles/dashboard/createlist.css";

function Createlist() {
  const [listData, setListData] = useState([]);
  const [formData, setFormData] = useState({
    receiverAddress: "",
    tokenAmount: "",
    tokenSymbol: "",
    chainName: "",
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
      chainName: "",
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
        <input
          className="each-input-of-create-list"
          type="text"
          name="chainName"
          value={formData.chainName}
          placeholder="Enter Chain name"
          onChange={handleInputChange}
        />
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
            <button className="send-button">Begin Payment</button>
          </div>
        ) : (
          <h3>Your Transactions list will be listed here!!</h3>
        )}
      </div>
    </div>
  );
}

export default Createlist;
