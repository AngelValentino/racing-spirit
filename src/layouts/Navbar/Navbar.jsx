import { Link, NavLink } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import MenuButton from "./components/MenuButton";
import CartButton from "./components/CartButton";

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
            <Link aria-label="Go to home." title="Home" to="/">
              <img aria-hidden="true" className="nav-menu__logo" src="https://i.imgur.com/vsr1qhX.png" alt="" />
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
          <div className="nav-menu__btns">
            <MenuButton openModal={openModal} menuType="menu"/>
            <CartButton openModal={openModal} menuType="cart" cartQuantity={cartQuantity}/>
          </div>
        </nav>
      </header>
    </>
  );
}
 
export default Navbar;