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
        <p className="nav-main__cart">CART</p>
      </nav>
    </header>
  );
}
 
export default Navbar;