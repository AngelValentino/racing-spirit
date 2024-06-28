import { NavLink } from "react-router-dom";
import { useModal } from "../../../../context/ModalContext";

const MobileMenuLink = ({ url, children }) => {
  const { closeModal } = useModal();

  return ( 
    <li>
      <h2>
        <NavLink to={url} onClick={closeModal}>{children}</NavLink>
      </h2>
    </li>
  );
}
 
export default MobileMenuLink;