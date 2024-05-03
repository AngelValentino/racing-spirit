import { useRef } from "react";
import { useState } from "react";

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
      if (index === 0) return 0
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
    <>
      <div className="product-image-container">
        {jacket.images.map((img, i) => (
          <img aria-hidden={imgIndex !== i} style={{translate: `${-100 * imgIndex}%`}} className="product-image" key={img.regular} src={img.regular} alt={`${jacket.title} ${i + 1}`} />
        ))}
      </div>
      <div className="slider-controls">
        <button className="slider-controls__prev-btn" aria-label="Previous image." onClick={slideLeft}>&lt;</button>
        <div ref={carousel} className="slider-controls__carousel">
          {jacket.images.map((img, i) => (
            <img tabIndex="0" style={{border: i === imgIndex ? '3px solid black' : null}} className="slider-controls__carousel-img" key={img.small} src={img.small} alt={`${jacket.title} preview ${i + 1}`} onClick={() => {
              setImgIndex(i);
            }}/>
          ))}
        </div>
        <button className="slider-controls__next-btn" aria-label="Next image." onClick={slideRight}>&gt;</button>
      </div>
    </>
  );
}
 
export default ProductPreviewSlider;