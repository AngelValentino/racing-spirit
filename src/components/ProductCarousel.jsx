import { useRef } from "react";
import '../styles/carousel.css';

const ProductCarousel = ({ recommended, children }) => {
  const carousel = useRef(null);
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);

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
    <div className={recommended ? 'carousel recommended-products-carousel' : 'carousel'}>
      <button ref={prevBtn} className="carousel__btn carousel__prev-btn" id="prev-btn" onClick={slideLeft}>left</button>
      <ul ref={carousel} className="carousel__slider" onScroll={handleScroll}>
        {/* <Products url={productsUrl} carousel={true}/> */}
        {children}
      </ul>
      <button ref={nextBtn} className="carousel__btn carousel__next-btn" id="next-btn" onClick={slideRight}>right</button>
    </div>
  );
}
 
export default ProductCarousel;