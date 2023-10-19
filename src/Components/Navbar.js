import React from "react";
import "../Styles/navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <div>
      <div className="div-to-flex-logo-connect-wallet">
        <div>
          <h1>Smart Portal</h1>
        </div>
        <div className="connect-wallet-button-div">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
