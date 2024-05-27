import { useModal } from "../../context/ModalContext";
import SlideMenuLink from "./components/SlideMenuLink";
import SocialIconsList from "../../components/SocialIconsList";

const SlideMenu = () => {
  const { closeModal } = useModal();
  return ( 
    <>
      <section className="slide-menu-links">
        <ul>
          <SlideMenuLink url="jackets" closeModal={closeModal}>Jackets</SlideMenuLink>
          <SlideMenuLink url="about" closeModal={closeModal}>About us</SlideMenuLink>
          <SlideMenuLink url="contact" closeModal={closeModal}>Contact</SlideMenuLink>
        </ul>
      </section>
      <section className="slide-menu-social-icons">
        <SocialIconsList listClass="slide-menu__social-links"/>
      </section>
    </>
  );
}
 
export default SlideMenu;