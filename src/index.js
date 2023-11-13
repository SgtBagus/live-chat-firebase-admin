import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
