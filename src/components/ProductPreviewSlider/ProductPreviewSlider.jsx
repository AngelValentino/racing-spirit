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
    <section className="product-preview-slider">
      <div className="product-thumbs-vertical-container">
        <ProductThumbsList 
          jacket={jacket}
          imgIndex={imgIndex}
          className={"slider-controls__grid-vertical-img"}
          setImgIndex={setImgIndex}
        />
      </div>
      <div className="product-image-container">
        <ProductImgsList jacket={jacket} imgIndex={imgIndex} />
      </div>
      <div className="slider-controls">
        <button className="slider-controls__prev-btn" aria-label="Previous image." onClick={slideLeft}>&lt;</button>
        <div ref={carousel} className="slider-controls__carousel">
          <ProductThumbsList 
            jacket={jacket}
            imgIndex={imgIndex}
            className={"slider-controls__carousel-img"}
            setImgIndex={setImgIndex}
          />
        </div>
        <button className="slider-controls__next-btn" aria-label="Next image." onClick={slideRight}>&gt;</button>
      </div>
    </section>
  );
}
 
export default ProductPreviewSlider;