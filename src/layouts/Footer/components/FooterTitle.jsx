import { Link } from "react-router-dom";

const FooterTitle = () => {
  return ( 
    <div>
      <h2 className="footer-title">
        <Link aria-label="Go to home." to="/">
          <img aria-hidden="true" src="../images/racing-spirit-logo-white.png" alt="" />
        </Link>
      </h2>
      <p className="footer-title__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum alias nulla, animi ad quibusdam excepturi amet cumque pariatur molestias necessitatibus?</p>
    </div>
  );
}
 
export default FooterTitle;