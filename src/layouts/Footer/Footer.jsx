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
          <small>&#169; {new Date().getFullYear()} Racing Spirit</small>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;