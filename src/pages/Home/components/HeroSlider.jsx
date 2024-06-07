import { useState, useEffect, useRef } from "react";
import useSwipe from "../../../hooks/useSwipe";
import HeroImgs from "./HeroImgs";
import { heroImgsData } from "../../../data/heroImgsData";
import NavigationBtns from "./NavigationBtns";

const HeroSlider = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const intervalTim = useRef(null);
  const progressRef = useRef(null);
  const progressBarTim = useRef(null);
  const checkCurrentSlide = useRef(0);

  const autoplay = false;

  function showPrevImage() {
    setImgIndex((index) =>  index === 0 ? heroImgsData.length - 1 : index - 1);
  }

  function showNextImage() {
    setImgIndex((index) => index === heroImgsData.length - 1 ? 0 : index + 1);
  }

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(showNextImage, showPrevImage);

  const resetProgressBar = () => {
    clearTimeout(progressBarTim.current);
    progressRef.current.style.transition = 'none';
    progressRef.current.style.width = '0%';
    
    progressBarTim.current = setTimeout(() => {
      progressRef.current.style.transition = 'width 5s linear';
      progressRef.current.style.width = '105%';
    }, 1500); 
 /* Delay to allow the browser to reset the width, also appears 
    just after the hero button. 
    1500ms - HeroTittle(500ms) + HeroButton(1500ms)* Both timers start 
    at the same time so it finnally becomes 1500ms */
  };
  
  useEffect(() => {
    resetProgressBar();
    // 5000ms + 1500ms to wait for the hero title and progress bar to appear
    intervalTim.current = autoplay && setInterval(() => {
      showNextImage();
    }, 6500);
  
    return () => clearInterval(intervalTim.current);
  }, [imgIndex]);

  return ( 
    <header>
      <div className="hero-slider">
        <div 
          className="hero-slider__main-img-slider-container"     
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <HeroImgs checkCurrentSlide={checkCurrentSlide} imgIndex={imgIndex} />
        </div>
        <div className="hero-slider__navigation-btns-container">
          <NavigationBtns imgIndex={imgIndex} setImgIndex={setImgIndex} />
        </div>
        <div className="hero-slider__arrow-btns-container">
          <button aria-label="Show previous image." className="hero-slider__prev-btn" onClick={showPrevImage}>left</button>
          <button aria-label="Show next image." className="hero-slider__next-btn" onClick={showNextImage}>right</button>
        </div>
        <div className="hero-slider__progress-bar-container">
          <div className="hero-slider__progress-bar" ref={progressRef}></div>
        </div>
      </div>
    </header>
  );
}
 
export default HeroSlider;