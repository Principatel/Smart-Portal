import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/dashboard/viewlist.css";

function Viewlist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const handleSearch = () => {
    // Filter transactions based on the search query
    const filtered = transactions.filter((transaction) =>
      transaction.receiverAddress
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Dummy transaction data
  const transactions = [
    {
      receiverAddress: "0xf6A00f1",
      tokenAmount: "100",
      tokenSymbol: "ETH",
      chainId: "1",
    },
    {
      receiverAddress: "0x7Bb9cD2",
      tokenAmount: "50",
      tokenSymbol: "BTC",
      chainId: "2",
    },
    // Add more transactions as needed
  ];

  // Automatically trigger the search when searchQuery changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <div>
      <div className="title-view-history">
        <h1>View Your Transactions</h1>
      </div>
      <div className="div-to-view-all-transaction">
        <div className="div-for-search-bar">
          <div className="search-bar">
            <div className="search-input-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                className="search-bar-view"
                placeholder="Search for an address..."
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="div-to-display-all-txs">
          <table>
            <thead>
              <tr>
                <th>Receiver Address</th>
                <th>Token Amount</th>
                <th>Token Symbol</th>
                <th>Chain ID</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.receiverAddress}</td>
                  <td>{transaction.tokenAmount}</td>
                  <td>{transaction.tokenSymbol}</td>
                  <td>{transaction.chainId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Viewlist;
