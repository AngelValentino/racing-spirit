import { useRef } from "react";
import { useState } from "react";
import ProductImgsList from "./ProductImgsList";
import ProductThumbsList from "./ProductThumbsList";

const ProductPreviewSlider = ({data: jacket}) => {
  const carousel = useRef(null);
  const [imgIndex, setImgIndex] = useState(0);

  function showNextImage() {
    setImgIndex((index) => {
      if (index === carousel.current.children.length - 1) return carousel.current.children.length - 1;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImgIndex((index) => {
      if (index === 0) return 0;
      return index - 1;
    });
  }

  function slideLeft() {
    showPrevImage();
    const firstImageWidth = carousel.current.children[0].clientWidth;
    carousel.current.scrollLeft -= firstImageWidth;
  }

  function slideRight() {
    showNextImage(); 
    const firstImageWidth = carousel.current.children[0].clientWidth;
    carousel.current.scrollLeft += firstImageWidth;
  }

  return ( 
    <div className="product-slider">
      <div className="product-slider__vertical-thumbs-container">
        <ProductThumbsList 
          jacket={jacket}
          imgIndex={imgIndex}
          className={"product-slider__vertical-thumb"}
          setImgIndex={setImgIndex}
        />
      </div>
      <div className="product-slider__main-img">
        <ProductImgsList jacket={jacket} imgIndex={imgIndex} />
      </div>
      <div className="slider-controls">
        <button className="slider-controls__prev-btn" aria-label="Previous image." onClick={slideLeft}>
          <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="currentColor" d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z"/>
          </svg>
        </button>
        <div ref={carousel} className="slider-controls__carousel">
          <ProductThumbsList 
            jacket={jacket}
            imgIndex={imgIndex}
            className={"slider-controls__carousel-img"}
            setImgIndex={setImgIndex}
          />
        </div>
        <button className="slider-controls__next-btn" aria-label="Next image." onClick={slideRight}>
          <svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="currentColor" d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
 
export default ProductPreviewSlider;