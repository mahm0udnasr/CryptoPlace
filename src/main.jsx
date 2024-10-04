import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CoinContextProvider from "./Context/CoinContext.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
    </BrowserRouter>
);
