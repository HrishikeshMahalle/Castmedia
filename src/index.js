import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalState";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./Context/authcontext";
// Call make Server
 makeServer(); 

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
