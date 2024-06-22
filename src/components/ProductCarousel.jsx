import { useRef } from "react";
import '../styles/carousel.css';
import Products from "./Products";

const ProductCarousel = ({ hidden }) => {
  const carousel = useRef(null);
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);
  const productsUrl = 'https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products?_page=1&_limit=6';

  function slideRight() {
    carousel.current.scrollLeft += carousel.current.children[0].offsetWidth + 30;
  }

  function slideLeft() {
    carousel.current.scrollLeft -= carousel.current.children[0].offsetWidth + 30;
  }

  function handleScroll() {
    // Maximum scrollable width
    const maxScrollLeft = carousel.current.scrollWidth - carousel.current.clientWidth;

    // Current scroll position
    const currentScrollLeft = carousel.current.scrollLeft;

    if (currentScrollLeft === maxScrollLeft) {
        // Scrolled to the maximum width
        nextBtn.current.style.display = 'none';
    } 
    else if (currentScrollLeft < maxScrollLeft) {
      nextBtn.current.style.display = 'initial';
    }

    if (currentScrollLeft === 0) {
        // Scrolled to the initial width
        prevBtn.current.style.display = 'none';
    } 
    else if (currentScrollLeft !== 0)
      prevBtn.current.style.display = 'initial';
  }

  return ( 
    <div className={hidden ? 'carousel recommended-products-carousel' : 'carousel'}>
      <button aria-controls="carousel__slider" aria-label="Show previous image." ref={prevBtn} className="carousel__btn carousel__prev-btn" onClick={slideLeft}>
        <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="m16.75 17l-7.5-5l7.5-5a.901.901 0 1 0-1-1.5l-8.502 5.668a1 1 0 0 0 0 1.664L15.75 18.5a.901.901 0 1 0 1-1.5" />
        </svg>
      </button>
      <ul id="carousel__slider" ref={carousel} className="carousel__slider" onScroll={handleScroll}>
        <Products url={productsUrl} carousel={true}/>
      </ul>
      <button aria-controls="carousel__slider" aria-label="Show next image." ref={nextBtn} className="carousel__btn carousel__next-btn" onClick={slideRight}>
        <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="m7.25 17l7.5-5l-7.5-5a.901.901 0 1 1 1-1.5l8.502 5.668a1 1 0 0 1 0 1.664L8.25 18.5a.901.901 0 1 1-1-1.5" />
        </svg>
      </button>
    </div>
  );
}
 
export default ProductCarousel;