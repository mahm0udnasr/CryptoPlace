import "./Coin.css";
// get id from path url
import { useParams } from "react-router-dom";
// use context to get api call funcation and request
import { CoinContext } from "../../Context/CoinContext";
import { useEffect, useContext, useState } from "react";
// chart componet
import LineChart from "../../components/LineChart/LineChart";

export default function Coin() {
  const { CoinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinData, setCoinData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-bQK83wQftfe3W17aCFMcGH3x	",
    },
  };
  const mainUrl = "https://api.coingecko.com/api/v3/coins/";
  const fetchCoinById = async () => {
    await fetch(`${mainUrl}${CoinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
    await fetch(
      `${mainUrl}${CoinId}/market_chart?vs_currency=${currency?.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCoinById();
  }, [currency]);
  return coinData && historicalData && Object.keys(coinData).length > 0 ? (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.id} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>
            {currency.symbol}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>
            {currency.symbol}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="spinner">
      <div className="spin"></div>
    </div>
  );
}
