import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import {BrowserRouter as Router} from "react-router-dom";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const root = document.getElementById("root");
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      desiredChainId={ChainId.Goerli}
    >
      <Router>
        <App />
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
