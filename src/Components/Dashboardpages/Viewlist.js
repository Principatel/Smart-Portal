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
      receiverAddress: "0x5A819d4b53C1f7E0FBBbf48936E92D0a55D073C2",
      tokenAmount: "420",
      tokenSymbol: "LINK",
      chainId: "8",
      hash: "https://example.com/hash8",
    },
    {
      receiverAddress: "0x2cA01Fb9fB93D56E5916e9e27cE4A3A8473EbCEa",
      tokenAmount: "750",
      tokenSymbol: "ADA",
      chainId: "5",
      hash: "https://example.com/hash9",
    },
    {
      receiverAddress: "0xE1f78b4871540D6aC17C6b38eA40dCcAdD3B447A",
      tokenAmount: "120",
      tokenSymbol: "BTC",
      chainId: "2",
      hash: "https://example.com/hash10",
    },
    {
      receiverAddress: "0xFbB3A7AC13B99FAD13b26F8C1f6A2480f0e67F5e",
      tokenAmount: "300",
      tokenSymbol: "ETH",
      chainId: "1",
      hash: "https://example.com/hash11",
    },
    {
      receiverAddress: "0x2cA01Fb9fB93D56E5916e9e27cE4A3A8473EbCEa",
      tokenAmount: "900",
      tokenSymbol: "BNB",
      chainId: "6",
      hash: "https://example.com/hash12",
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
                placeholder="Search for 0xf4g5df..."
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
                <th>Hash</th> {/* Add the new "hash" column */}
              </tr>
            </thead>
            <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.receiverAddress}</td>
                  <td>{transaction.tokenAmount}</td>
                  <td>{transaction.tokenSymbol}</td>
                  <td>{transaction.chainId}</td>
                  <td>
                    <a
                      href={transaction.hash}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {transaction.hash}
                    </a>
                  </td>
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
