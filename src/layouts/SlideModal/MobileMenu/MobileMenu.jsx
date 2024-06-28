import MobileMenuLink from "./components/MobileMenuLink";
import SocialIconsList from "../../../components/SocialIconsList";

const MobileMenu = () => {
  return ( 
    <>
      <section className="mobile-menu-links">
        <ul>
          <MobileMenuLink url="jackets">Jackets</MobileMenuLink>
          <MobileMenuLink url="about">About us</MobileMenuLink>
          <MobileMenuLink url="contact">Contact</MobileMenuLink>
        </ul>
      </section>
      <section className="mobile-menu-social-icons">
        <SocialIconsList listClass="mobile-menu__social-links"/>
      </section>
    </>
  );
}
 
export default MobileMenu;