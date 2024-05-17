import { Link, NavLink } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import MenuButton from "../components/NavMenuButtons/MenuButton";
import CartButton from "../components/NavMenuButtons/CartButton";

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