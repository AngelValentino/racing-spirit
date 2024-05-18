import { Link } from "react-router-dom";

const FooterMenuLinks = () => {
  return ( 
    <div className="footer-links">
      <h2>MAIN MENU</h2>
      <ul className="footer-links__list">
        <li>
          <Link to="jackets">Jackets</Link>
        </li>
        <li>
          <Link to="about">About us</Link>
        </li>
        <li>
          <Link to="contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
 
export default FooterMenuLinks;