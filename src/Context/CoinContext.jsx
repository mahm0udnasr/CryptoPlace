import { createContext, useEffect, useState } from "react";
export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-bQK83wQftfe3W17aCFMcGH3x	",
    },
  };
  const mainUrl = "https://api.coingecko.com/api/v3/coins";
  const fetchAllCoin = async () => {
    fetch(
      `${mainUrl}/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllCoin(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);
  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };
  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinContextProvider;
