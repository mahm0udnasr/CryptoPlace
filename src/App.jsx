// Routing
import {Routes, Route } from "react-router-dom";
// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Coin from "./pages/View/Coin";
import Posts from "./pages/Posts/Posts";
import Error from "./pages/Error/Error";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:CoinId" element={<Coin />} />
        <Route path="/blog" element={<Posts />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}
