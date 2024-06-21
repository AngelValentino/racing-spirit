import { useEffect } from "react";
import ProductCarousel from "../../components/ProductCarousel";
import HeroSlider from "./components/HeroSlider";
import '../../styles/home.css'
import { Link } from "react-router-dom";
import { gridProductsImagesData } from "../../data/gridProductsImagesData";

const Home = () => {
  return ( 
    <main className="main-home">
      <HeroSlider />
      <div className="main-home__content">
        <section className="main-home__carousel-section">
          <ProductCarousel />
          <div className="main-home__carousel-section-btn-container">
            <Link to="/jackets" className="arrow-btn-v1 arrow-btn main-home__carousel-section-btn">View all</Link>
          </div>
        </section>
        <section className="main-home__grid-products-links">
          {gridProductsImagesData.map(({ url, alt, title }, i) => (
            <Link className="main-home__grid-product-link" key={i} to="/jackets">
              <img className="main-home__grid-product-link-img" src={url} alt={alt} />
              <h2 className="main-home__grid-product-link-title">{title.toUpperCase()}</h2>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
 
export default Home;