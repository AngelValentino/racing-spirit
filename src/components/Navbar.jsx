import { Link, NavLink } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const { openModal } = useModal();
  const { cartQuantity } = useShoppingCart();

  return ( 
    <>
      <div className="announcement">
        <p className="announcement__text">Free Worldwide Shipping On Orders Over $400</p>
      </div>
      <header className="header-nav">
        <nav className="nav-menu">
          <h2 className="nav-menu__title">
            <Link to="/">
              <img title="home" className="nav-menu__logo" src="../images/racing-spirit-logo.png" alt="" />
            </Link>
          </h2>
          <ul className="nav-menu__links">
            <li>
              <NavLink to="jackets">Jackets</NavLink>
            </li>
            <li>
              <NavLink to="about">About us</NavLink>
            </li>
            <li>
              <NavLink to="contact">Contact</NavLink>
            </li>
          </ul>
          <div className="nav-menu__cart-container">
            <button className="menu-btn" onClick={() => {
              openModal('menu');
            }}>
              <svg className="menu-btn__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 4h18v2H3zm0 7h12v2H3zm0 7h18v2H3z" />
              </svg>
            </button>
            <button title="cart" aria-label="Open cart." className="nav-menu__cart-btn" onClick={() => {
                openModal('cart');
            }}>
              <svg aria-hidden="true" className="nav-menu__cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9v20h22V9Zm5 0s0-6 6-6s6 6 6 6" />
              </svg>
              <div aria-label={`You have ${cartQuantity} items in cart.`} className="nav-menu__cart-notif-icon" style={cartQuantity ? {display: "block"} : {display: "none"}}></div>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
 
export default Navbar;