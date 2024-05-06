import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return ( 
    <header className="header-nav">
      <nav className="nav-main">
        <h2 className="nav-main__title">
          <Link to="/">Racing Spirit</Link>
        </h2>
        <ul className="nav-main__list">
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
        <div className="nav-main__cart-container">
          <button className="nav-main__cart">CART</button>
          <div className="nav-main__cart-qty">
            <p>0</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
 
export default Navbar;