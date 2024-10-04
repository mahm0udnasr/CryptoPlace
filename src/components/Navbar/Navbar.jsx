import "./Navbar.css";
import Logo from "../../assets/logo.png";
import arrow from "../../assets/arrow_icon.png";
import { useContext } from "react";
import { CoinContext } from "../../Context/CoinContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { setCurrency } = useContext(CoinContext);
  const navigate = useNavigate();
  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        {
          setCurrency({ name: "usd", symbol: "$" });
        }
        break;
      case "eur":
        {
          setCurrency({ name: "eur", symbol: "€" });
        }
        break;
      default:
        {
          setCurrency({ name: "usd", symbol: "$" });
        }
        break;
    }
  };
  return (
    <header className="navbar">
      <img onClick={()=> navigate('/')} src={Logo} alt="crypto space logo" className="logo" />
      <ul>
        <li onClick={()=> navigate('/')}>Home</li>
        <li onClick={()=> navigate('/blog')}>Blog</li>
      </ul>
      <div className="nav-right">
        <label htmlFor="changeCoin" style={{ width: "0px" }}>
          Change Coin
        </label>
        <select id="changeCoin" onChange={currencyHandler}>
          <option value="usd">USD | $</option>
          <option value="eur">EUR | €</option>
        </select>
        {/* <button> */}
        <a href="https://t.me/mahm0udnasr">
          Telegram <img src={arrow} alt="arrow-up icon" />
        </a>
        {/* </button> */}
      </div>
    </header>
  );
}
