import { Link } from "react-router-dom";

const FooterTitle = () => {
  return ( 
    <div>
      <h2 className="footer-title">
        <Link aria-label="Go to home." to="/">
          <img aria-hidden="true" role="presentation" src="https://i.imgur.com/q95oUnt.png" alt="" />
        </Link>
      </h2>
      <p className="footer-title__desc">Embrace the unbridled character of the open road with Racing Spirit. Our motorcycle jackets merge raw freedom with refined craftsmanship. Each piece is a journey, woven with threads of resilience and style, ready to accompany you on every adventure.</p>
    </div>
  );
}
 
export default FooterTitle;