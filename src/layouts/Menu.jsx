import { useModal } from "../context/ModalContext";
import SlideMenuLink from "../components/SlideMenuLinks/SlideMenuLink";
import SlideMenuSocialLinks from "../components/SlideMenuLinks/SlideMenuSocialLinks";

const Menu = () => {
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
        <SlideMenuSocialLinks />
      </section>
    </>
  );
}
 
export default Menu;