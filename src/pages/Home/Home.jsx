import "./Home.css";
// context
import { useCallback, useContext, useEffect, useState } from "react";
import { CoinContext } from "../../Context/CoinContext";
// debouncing
import { debounce } from "lodash";
// navigation
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const navigate = useNavigate();
  const [displayCoin, setDisplayCoin] = useState([]);
  const [term, setTerm] = useState("");
  const termInputHandler = (event) => {
    setTerm(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    } else {
      debouncedSearch(event.target.value);
    }
  };
  const debouncedSearch = useCallback(
    debounce((value) => {
      const coins = allCoin.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      setDisplayCoin(coins);
    }, 300),
    [allCoin]
  );
  const buttonClickSearchHandle = (event) => {
    event.preventDefault();
    const coins = allCoin.filter((item) => {
      return item.name.toLowerCase().includes(term.toLowerCase());
    });
    setDisplayCoin(coins);
  };
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);
  return (
    <main className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={buttonClickSearchHandle}>
          <input
            type="text"
            placeholder="Search crypto.."
            autoComplete="search crypto bar"
            onChange={termInputHandler}
            value={term}
            required
            list="coinList"
          />
          <datalist id="coinList">
            {term.length > 1
              ? allCoin.map((item, index) => (
                  <option key={index} value={item.name} />
                ))
              : null}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p>Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <div
            className="table-layout"
            style={{ cursor: "pointer" }}
            key={index}
            onClick={() => navigate(`/coin/${item.id}`)}
          >
            <p>{item.market_cap_rank}</p>
            <div>
              <img
                width="25px"
                height="100%"
                loading="lazy"
                src={item.image}
                alt={item.name}
              />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p>
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
