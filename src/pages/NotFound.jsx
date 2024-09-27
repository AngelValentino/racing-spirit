import '../styles/notFound.css';
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

const NotFound = () => {
  return ( 
    <main className="main-not-found">
      <header className="not-found-header">
        <h1 className="not-found-header__title">404 Page Not Found</h1>
        <p className="not-found-header__desc">The page you were looking for does not exist.</p>
        <Link className="slide-in-and-back underline fixed-height not-found-header__link" to="/">Continue shopping</Link>
      </header>
      <section className="not-found-carousel">
        <div className="not-found-carousel__title-container">
          <h2 className="not-found-carousel__title">Popular picks</h2>
          <Link to="/jackets" className="slide-in-and-back underline fixed-height not-found-carousel__link">View all</Link>
        </div>
        <ProductCarousel />
      </section>
    </main>
  );
}
 
export default NotFound;