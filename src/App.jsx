
import "./App.css";

import Footer from "./assets/footer/footer";
import Frontview from "./assets/routes/frontview";

import OrderSuccess from "./assets/routes/order";
import Scroll from "./assets/scroll_top/scroll_top";

import Menu from "./assets/routes/menu";
import Cart from "./assets/routes/cartt";
import Checkout from "./assets/routes/checkoutt";
import OurStory from "./assets/routes/ourstory";
import Contact from "./assets/routes/contact";
import { CartProvider } from "./assets/cartcontextt/cartcontextt";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <CartProvider>
      <Router>
        <Scroll />

        <Routes>
          <Route path="/" element={<Frontview />} />
          {/* <Route path="/about-us" element={<Features />} /> */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders/success" element={<OrderSuccess />} />
        </Routes>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;