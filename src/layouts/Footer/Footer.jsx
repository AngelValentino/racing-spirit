import '../../styles/footer.css';
import SocialIconsList from "../../components/SocialIconsList";
import PaymentsList from "../../components/PaymentsList";
import FooterTitle from "./components/FooterTitle";
import FooterMenuLinks from "./components/FooterMenuLinks";
import FooterNewsletter from "./components/FooterNewsletter";

const Footer = () => {
  return ( 
    <footer>
      <div className="footer-content-wrapper">
        <div className="footer-info">
          <FooterTitle />
          <FooterMenuLinks />
          <FooterNewsletter />
          <div className="footer-social">
            <SocialIconsList listClass="footer__social-links" />
          </div>
        </div>
        <div className="footer-copyright">
          <PaymentsList />
          <div className="footer-copyright__disclaimer-container">
            <small>Portfolio UI demo project. All logos, brands, and designs are the property of their respective owners. This project is not affiliated with or endorsed by any brand or service.</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;