import '../styles/carousel.css';
import { useRef } from "react";
import Products from "./Products";

const ProductCarousel = ({ hidden }) => {
  const carouselRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const productsUrl = 'https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products?_page=1&_limit=6';

  function slideRight() {
    carouselRef.current.scrollLeft += carouselRef.current.children[0].offsetWidth + 30;
  }

  function slideLeft() {
    carouselRef.current.scrollLeft -= carouselRef.current.children[0].offsetWidth + 30;
  }

  function handleScroll() {
    const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const currentScrollLeft = carouselRef.current.scrollLeft;

    // Adjusting visibility of next button based on scroll position
    if (currentScrollLeft === maxScrollLeft) {
      nextBtnRef.current.style.display = 'none'; // Hide next button when scrolled to maximum width
    } 
    else if (currentScrollLeft < maxScrollLeft) {
      nextBtnRef.current.style.display = 'initial'; // Show next button when not scrolled to maximum width 
    }

    // Adjusting visibility of previous button based on scroll position
    if (currentScrollLeft === 0) {
        prevBtnRef.current.style.display = 'none'; // Hide previous button when scrolled to initial width
    } 
    else if (currentScrollLeft !== 0) {
      prevBtnRef.current.style.display = 'initial'; // Show previous button when not scrolled to initial width
    }
  }

  return ( 
    <div className={hidden ? 'carousel recommended-products-carousel' : 'carousel'}>
      <button aria-controls="carousel__slider" aria-label="Show previous image." ref={prevBtnRef} className="carousel__btn carousel__prev-btn" onClick={slideLeft}>
        <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="m16.75 17l-7.5-5l7.5-5a.901.901 0 1 0-1-1.5l-8.502 5.668a1 1 0 0 0 0 1.664L15.75 18.5a.901.901 0 1 0 1-1.5" />
        </svg>
      </button>
      <ul id="carousel__slider" ref={carouselRef} className="carousel__slider" onScroll={handleScroll}>
        <Products url={productsUrl} carousel={true}/>
      </ul>
      <button aria-controls="carousel__slider" aria-label="Show next image." ref={nextBtnRef} className="carousel__btn carousel__next-btn" onClick={slideRight}>
        <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="m7.25 17l7.5-5l-7.5-5a.901.901 0 1 1 1-1.5l8.502 5.668a1 1 0 0 1 0 1.664L8.25 18.5a.901.901 0 1 1-1-1.5" />
        </svg>
      </button>
    </div>
  );
}
 
export default ProductCarousel;