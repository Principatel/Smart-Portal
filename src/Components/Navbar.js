import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../Styles/navbar.css";
import smartlogo from "../../src/Assets/Smart Portal light.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <div>
      <div className="div-to-flex-logo-connect-wallet">
        <div>
          {/* Wrap the logo image in a Link component */}
          <Link to="/">
            <img
              className="smart-logo-portal"
              src={smartlogo}
              alt="not foundd"
            />
          </Link>
        </div>
        <div className="connect-wallet-button-div">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
