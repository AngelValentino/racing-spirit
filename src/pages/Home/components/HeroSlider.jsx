import { useState, useEffect, useRef } from "react";
import { heroImgsData } from "../../../data/heroImgsData";
import useSwipe from "../../../hooks/useSwipe";
import HeroImgs from "./HeroImgs";
import NavigationBtns from "./NavigationBtns";

const HeroSlider = () => {
  const [ imgIndex, setImgIndex ] = useState(0);
  const [ isProgressBarStyled, setIsProgressBarStyled ] = useState(false);
  const [ autoPlay, setAutoPlay ] = useState(true);
  const heroVideoRef = useRef(null);

  // AutoPlay stops when the user tabs out of the page and restarts when they come back.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // User tabbed back into the page
        setAutoPlay(true);
        setImgIndex(0);
      } else {
        // User tabbed out from the page
        setAutoPlay(false);
        heroVideoRef.current.currentTime = 0; // Reset video playback
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  function showPrevImage() {
    setImgIndex(index => index === 0 ? heroImgsData.length - 1 : index - 1);
  }

  function showNextImage() {
    setImgIndex(index => index === heroImgsData.length - 1 ? 0 : index + 1);
  }

  // Custom hook for swipe functionality
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(showNextImage, showPrevImage);

  // Calculate progress bar styling
  function getProgressBarStyle() {
    // If progress bar is styled and not on the first image, expand width 105%
    if (isProgressBarStyled && imgIndex !== 0) {
      return { width: '105%' };
    } 
    // If progress bar is styled and is on the first image, expand width 103%
    else if (isProgressBarStyled) {
      return { width: '103%', transition: 'width 11s linear' };
    } 
    // If progress bar is not styled, set width to 0 with no transition
    else {
      return { width: 0, transition: 'none' };
    }
  }
  
  useEffect(() => {
    let intervalId;
    let progressBarTim
    /* Delay to allow the browser to reset the width, also appears 
    just after the hero button. 
    1500ms - HeroTittle(500ms) + HeroButton(1500ms)* Both timers start 
    at the same time so it finnally becomes 1500ms */
    if (autoPlay) {
      // Timeout to delay progress bar appearance
      progressBarTim = setTimeout(() => {
        setIsProgressBarStyled(true); // Start progress bar after timeout
      }, 1500);
  
      // First carousel slide
      if (imgIndex === 0) {
        heroVideoRef.current.currentTime = 0; // Reset hero video
        intervalId = setInterval(() => {
          showNextImage();
        }, 12500); // Timeout for video
      } 
      // Other slides
      else {
        // 5000ms + 1500ms to wait for the hero title and progress bar to appear
        intervalId = setInterval(() => {
          showNextImage();
        }, 6500); // Timeout for images
      }
    } 

    return () => {
      clearInterval(intervalId);
      clearTimeout(progressBarTim);
      setIsProgressBarStyled(false);
    };
  }, [imgIndex, autoPlay]);

  return ( 
    <header>
      <section aria-roledescription="carousel" className="hero-slider">
        <div
          className="hero-slider__main-img-slider-container"     
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <HeroImgs 
            autoPlay={autoPlay} 
            imgIndex={imgIndex}
            heroVideoRef={heroVideoRef}
          />
        </div>
        <div className="hero-slider__navigation-btns-container">
          <NavigationBtns imgIndex={imgIndex} setImgIndex={setImgIndex} />
        </div>
        <div className="hero-slider__arrow-btns-container">
          <button aria-label="Show previous image." className="hero-slider__prev-btn" onClick={showPrevImage}>
            <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" d="m16.75 17l-7.5-5l7.5-5a.901.901 0 1 0-1-1.5l-8.502 5.668a1 1 0 0 0 0 1.664L15.75 18.5a.901.901 0 1 0 1-1.5" />
            </svg>
          </button>
          <button aria-label="Show next image." className="hero-slider__next-btn" onClick={showNextImage}>
            <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" d="m7.25 17l7.5-5l-7.5-5a.901.901 0 1 1 1-1.5l8.502 5.668a1 1 0 0 1 0 1.664L8.25 18.5a.901.901 0 1 1-1-1.5" />
            </svg>
          </button>
        </div>
        <div className="hero-slider__progress-bar-container">
          <div className="hero-slider__progress-bar" style={getProgressBarStyle()}></div>
        </div>
      </section>
    </header>
  );
}

export default HeroSlider;