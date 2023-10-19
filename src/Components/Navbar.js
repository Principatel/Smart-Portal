import React from "react";
import "../Styles/navbar.css";

function Navbar() {
  return (
    <div>
      <div className="div-to-flex-logo-connect-wallet">
        <div>
          <h1>Cross Disperse</h1>
        </div>
        <div>
          <button>Connect wallet</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
