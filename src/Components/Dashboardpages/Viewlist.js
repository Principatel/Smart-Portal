import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/dashboard/viewlist.css";
import { getSentTransaction } from "../../Helpers/GetSentTransactions";
import { decode } from "../../Helpers/DecodePayload";

function Viewlist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState([]);

  const handleSearch = () => {
    const filtered = transactionDetails.filter(
      (transaction) =>
        transaction.ChainName.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        transaction.TokenSymbol.toLowerCase().includes(
          searchQuery.toLowerCase()
        )
    );
    setFilteredTransactions(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleExpandClick = (index) => {
    const updatedTransactions = [...filteredTransactions];
    updatedTransactions[index].expanded = !updatedTransactions[index].expanded;
    setFilteredTransactions(updatedTransactions);
  };

  const fetchTransaction = async () => {
    const [allTransactions] = await Promise.all([getSentTransaction()]);
    console.log(allTransactions.data[0]["call"]["returnValues"]["payload"]);
    const details = [];

    for (let i = 0; i < allTransactions.data.length; i++) {
      const rec = await decode(
        allTransactions.data[i]["call"]["returnValues"]["payload"]
      );

      const totalSeconds = allTransactions.data[i]["time_spent"]["total"];

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const newTransaction = {
        ReceiverAddress: rec.receivers,
        TokenAmount: rec.amounts,
        TokenSymbol: allTransactions.data[i]["symbol"],
        ChainName:
          allTransactions.data[i]["call"]["returnValues"]["destinationChain"],
        Status: allTransactions.data[i]["status"],
        TransactionHash:
          allTransactions.data[i]["call"]["transactionHash"] +
          ":" +
          allTransactions.data[i]["call"]["logIndex"],
        TimeTaken: `${minutes} minutes ${seconds} seconds`,
        TotaTokenAmount: allTransactions.data[i]["amount"],
        TimeExecuted: new Date(
          allTransactions.data[i]["call"]["block_timestamp"] * 1000
        ).toLocaleString("en-US", {
          timeZone: "Asia/Kolkata", // IST time zone
          hour12: false,
        }),
        expanded: false, // Initially, details are not expanded
      };

      details.push(newTransaction);
    }
    setTransactionDetails(details);
    console.log(details);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, transactionDetails]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div>
      <div className="title-view-history">
        <h1>View Your Transactions</h1>
      </div>
      <div className="div-for-search-bar">
        <div className="search-bar">
          <div className="search-input-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="search-bar-view"
              placeholder="Search for Chain or Token"
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
              <th>Chain</th>
              <th>Token Symbol</th>
              <th>Total Amount</th>
              <th>Transfer date</th>
              <th>Time Taken</th>
              <th>Current Status</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.ChainName}</td>
                <td>{transaction.TokenSymbol}</td>
                <td>{transaction.TotaTokenAmount}</td>
                <td>{transaction.TimeExecuted}</td>
                <td>{transaction.TimeTaken}</td>
                <td>{transaction.Status}</td>
                <td>
                  <a
                    href={
                      "https://testnet.axelarscan.io/gmp/" +
                      transaction.TransactionHash
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"Click Me!!"}
                  </a>
                </td>
                <td>
                  <button onClick={() => handleExpandClick(index)}>
                    {transaction.expanded ? "Hide Details" : "Show Details"}
                  </button>
                  {transaction.expanded && (
                    <div>
                      <p>Receiver Address:</p>
                      <ul>
                        {transaction.ReceiverAddress.map(
                          (receiver, receiverIndex) => (
                            <li key={receiverIndex}>{receiver}</li>
                          )
                        )}
                      </ul>
                      <p>Token Amounts:</p>
                      <ul>
                        {transaction.TokenAmount.map((amount, amountIndex) => (
                          <li key={amountIndex}>
                            {(amount / 1000000).toString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Viewlist;
