import { NavLink } from "react-router-dom";

const SlideMenuLink = ({url, closeModal, children}) => {
  return ( 
    <li>
      <h2>
        <NavLink to={url} onClick={closeModal}>{children}</NavLink>
      </h2>
    </li>
  );
}
 
export default SlideMenuLink;