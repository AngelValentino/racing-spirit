import { useEffect, useRef, useState } from "react";
import ProductImgsList from "./ProductImgsList";
import ProductThumbsList from "./ProductThumbsList";
import useSwipe from "../../../hooks/useSwipe";

const ProductPreviewSlider = ({ data: jacket }) => {
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const carouselRef = useRef(null);
  const [ imgIndex, setImgIndex ] = useState(0);

  // Manage arrow buttons visibility on imgIndex change
  useEffect(() => {
    // Reached the end of the product images
    if (imgIndex === carouselRef.current.children.length - 1) {
      nextBtnRef.current.style.display = 'none'; // Hide next button
    } 
    // Reached the start of the product images
    else if (imgIndex === 0) {
      prevBtnRef.current.style.display = 'none'; // Hide previous button
    } 
    // Currently scrolling
    else {
      prevBtnRef.current.style.display = 'block'; // Show previous button
      nextBtnRef.current.style.display = 'block'; // Show next button
    }

    // Check if the current image index is the last one in the carousel
    if (imgIndex === carouselRef.current.children.length - 1) {
      // Scroll to the end of the carousel (right-most image)
      carouselRef.current.scrollTo(carouselRef.current.scrollWidth, 0);
    } 
    // Check if the current image index is the first one in the carousel
    else if (imgIndex === 0) {
      // Scroll to the beginning of the carousel (left-most image)
      carouselRef.current.scrollTo(0, 0);
    }
  }, [imgIndex])

  // Track the last scroll position, initially set to 0 if the carouselRef is not defined
  let lastScrollLeft = carouselRef.current ? carouselRef.current.scrollLeft : 0;

  // Manage arrow buttons visibility on scroll
  function handleScroll() {
    const currentScrollLeft = carouselRef.current.scrollLeft;
    // const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    
    // Scrolling to the right
    if (currentScrollLeft > lastScrollLeft) {
      prevBtnRef.current.style.display = 'block'; // Show previous button
    } 
    // Scrolling to the left
    else if (currentScrollLeft < lastScrollLeft) {
      nextBtnRef.current.style.display = 'block'; // Show next button
    }

    // Scrolling to the left, reached the initial width and the user is on the first image
    if (
      currentScrollLeft < lastScrollLeft && 
      currentScrollLeft === 0 && 
      imgIndex === 0
    ) {
      prevBtnRef.current.style.display = 'none'; // Hide previous button
    } 
    // Scrolling to the right, reached the maximum width and the user is on the last image
    else if (
      currentScrollLeft > lastScrollLeft && 
      /* If (currentScrollLeft === maxScrollLeft &&) check is added, 
      the nextBtn doesn't properly hide on Samsung mobile devices */
      imgIndex === carouselRef.current.children.length - 1
    ) {
      nextBtnRef.current.style.display = 'none'; // Hide next button
    }

    lastScrollLeft = currentScrollLeft;
  }

  function showNextImage() {
    // Update the image index to show the next image, but ensure it doesn't exceed the last image from the carousel
    setImgIndex(index => index === carouselRef.current.children.length - 1 ? carouselRef.current.children.length - 1 : index + 1);
  }

  function showPrevImage() {
    // Update the image index to show the previous image, ensuring it doesn't go below zero
    setImgIndex(index => index === 0 ? 0 : index - 1);
  }

  function slideLeft() {
    showPrevImage();
    const firstImageWidth = carouselRef.current.children[0].clientWidth + 10;
    carouselRef.current.scrollLeft -= firstImageWidth;
  }

  function slideRight() {
    showNextImage(); 
    const firstImageWidth = carouselRef.current.children[0].clientWidth + 10;
    carouselRef.current.scrollLeft += firstImageWidth;
  }

  // Custom hook for swipe functionality
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(showNextImage, showPrevImage);

  return ( 
    <section aria-roledescription="carousel" className="product-slider">
      <ul role="tablist" className="product-slider__vertical-thumbs-container">
        <ProductThumbsList 
          jacket={jacket}
          imgIndex={imgIndex}
          className={"product-slider__vertical-thumb"}
          setImgIndex={setImgIndex}
        />
      </ul>
      <div 
        className="product-slider__main-img"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ProductImgsList jacket={jacket} imgIndex={imgIndex} />
      </div>
      <div className="slider-controls">
        <button aria-controls="slider-controls__carousel" ref={prevBtnRef} className="slider-controls__prev-btn" aria-label="Show previous image." onClick={slideLeft}>
          <svg aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="currentColor" d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z" />
          </svg>
        </button>
        <ul id="slider-controls__carousel" role="tablist" ref={carouselRef} className="slider-controls__carousel" onScroll={handleScroll}>
          <ProductThumbsList 
            jacket={jacket}
            imgIndex={imgIndex}
            className={"slider-controls__carousel-img"}
            setImgIndex={setImgIndex}
          />
        </ul>
        <button aria-controls="slider-controls__carousel" ref={nextBtnRef} className="slider-controls__next-btn" aria-label="Show next image." onClick={slideRight}>
          <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="currentColor" d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
 
export default ProductPreviewSlider;