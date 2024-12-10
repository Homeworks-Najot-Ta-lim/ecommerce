import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

import logo from "../assets/icons/logo.svg";
import { useCart } from "../contexts/CartContext";

const Header = ({ handleSidebarOpen }) => {
  const [isActive, setIsActive] = useState(false);

  const { cart } = useCart();

  useEffect(() => {
    const watchScroll = () => {
      setIsActive(window.scrollY > 60);
    };

    window.addEventListener("scroll", watchScroll);
    return () => window.removeEventListener("scroll", watchScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-10 transition-all ${
        isActive ? "bg-white shadow-lg py-4" : "py-6"
      }`}
    >
      <div className="container flex justify-between px-6 mx-auto">
        <div className="w-10">
          <a href="/">
            <img src={logo} alt="logo icon" />
          </a>
        </div>

        <button className="relative sidebar-btn" onClick={handleSidebarOpen}>
          <ShoppingBag className="w-7 h-7" />
          <span className="absolute -bottom-1 -right-1 text-xs bg-red-500 text-white rounded-full min-w-4">
            {cart.length}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
