import React from "react";
import "../../Styles/iihomepage.css";

function Iihomepage() {
  return (
    <div>
      <div className="main-div-for-user-guide">
        <div className="rectangle-box-for-4-cards">
          <div id="a" className="card">
            <h2>Connect Wallet</h2>
            <p>Link your Wallet</p>
          </div>
          <div id="b" className="card">
            <h2>List Transactions</h2>
            <p>Enter Recipient Details</p>
          </div>
          <div id="c" className="card">
            <h2>Send Transaction</h2>
            <p>Initiate the transation</p>
          </div>
          <div id="d" className="card">
            <h2>View History</h2>
            <p>Monitor your Transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Iihomepage;
