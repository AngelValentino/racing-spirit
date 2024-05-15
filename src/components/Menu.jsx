import { Link } from "react-router-dom";
import { useModal } from "../context/ModalContext";

const Menu = () => {
  const { closeModal } = useModal();
  return ( 
    <div>
      <ul>
        <li>
          <Link to="jackets" onClick={closeModal}>Jackets</Link>
        </li>
        <li>
          <Link to="about" onClick={closeModal}>About us</Link>
        </li>
        <li>
          <Link to="contact" onClick={closeModal}>Contact</Link>
        </li>
      </ul>
    </div>
  );
}
 
export default Menu;