import { useState, useEffect, useRef } from "react";
import useSwipe from "../../../hooks/useSwipe";
import HeroImgs from "./HeroImgs";
import { heroImgsData } from "../../../data/heroImgsData";
import NavigationBtns from "./NavigationBtns";

const HeroSlider = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const checkCurrentSlide = useRef(0);
  const heroVideo = useRef(null);
  const [isProgressBarStyled, setIsProgressBarStyled] = useState(false);

  const autoplay = true;

  function showPrevImage() {
    setImgIndex((index) => index === 0 ? heroImgsData.length - 1 : index - 1);
  }

  function showNextImage() {
    setImgIndex((index) => index === heroImgsData.length - 1 ? 0 : index + 1);
  }

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(showNextImage, showPrevImage);


  function getProgressBarStyle() {
    if (isProgressBarStyled && imgIndex !== 0) {
      return {width: '105%'};
    } 
    else if (isProgressBarStyled) {
      return {width: '103%', transition: 'width 11s linear'};
    } 
    else {
      return {width: 0, transition: 'none'};
    }
  }
  
  useEffect(() => {
    let intervalTim;
    /* Delay to allow the browser to reset the width, also appears 
    just after the hero button. 
    1500ms - HeroTittle(500ms) + HeroButton(1500ms)* Both timers start 
    at the same time so it finnally becomes 1500ms */
    const progressBarTim = setTimeout(() => {
      setIsProgressBarStyled(true);
    }, 1500)

    // Reset hero video
    if (imgIndex === 0) {
      heroVideo.current.currentTime = 0;
      intervalTim = autoplay && setInterval(() => {
        showNextImage();
      }, 12500);
    } 
    //Timeout for images
    else {
      // 5000ms + 1500ms to wait for the hero title and progress bar to appear
      intervalTim = autoplay && setInterval(() => {
        showNextImage();
      }, 6500);
    }

    return () => {
      clearInterval(intervalTim);
      clearTimeout(progressBarTim);
      setIsProgressBarStyled(false);
    };
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
          <HeroImgs checkCurrentSlide={checkCurrentSlide} imgIndex={imgIndex} heroVideo={heroVideo}/>
        </div>
        <div className="hero-slider__navigation-btns-container">
          <NavigationBtns imgIndex={imgIndex} setImgIndex={setImgIndex} />
        </div>
        <div className="hero-slider__arrow-btns-container">
          <button aria-label="Show previous image." className="hero-slider__prev-btn" onClick={showPrevImage}>left</button>
          <button aria-label="Show next image." className="hero-slider__next-btn" onClick={showNextImage}>right</button>
        </div>
        <div className="hero-slider__progress-bar-container">
          <div className="hero-slider__progress-bar" style={getProgressBarStyle()}></div>
        </div>
      </div>
    </header>
  );
}
 
export default HeroSlider;