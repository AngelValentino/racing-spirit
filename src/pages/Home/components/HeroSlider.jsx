import { useState, useEffect, useRef } from "react";
import useSwipe from "../../../hooks/useSwipe";
import HeroText from "./HeroText";

const HeroSlider = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const intervalTim = useRef(null);
  const progressRef = useRef(null);
  const progressBarTim = useRef(null);
  const heroTitle = useRef([]);
  const heroBtn = useRef([]);

  const autoplay = false;

  const heroImgs = [
    {
      url: 'https://placehold.co/1920x1080?text=1',
      alt: 'text',
      title: 'title',
      btnText: 'shop'
    },
    {
      url: 'https://placehold.co/1920x1080?text=2',
      alt: 'text',
      title: 'title',
      btnText: 'shop'
    }, 
    {
      url: 'https://placehold.co/1920x1080?text=3',
      alt: 'text',
      title: 'title',
      btnText: 'shop'
    }
  ]

  function showPrevImage() {
    setImgIndex((index) =>  index === 0 ? heroImgs.length - 1 : index - 1);
  }

  function showNextImage() {
    setImgIndex((index) => index === heroImgs.length - 1 ? 0 : index + 1);
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
    500ms to show and 1000 to start the button opacity animation */
  };
  
  useEffect(() => {
    resetProgressBar();
    let btnTim;

    // Hero title appears after 500ms, hero button after 1500s
    const heroTextContainerTim = setTimeout(() => {
      heroTitle.current[imgIndex].style.transition = 'bottom 1s';
      heroTitle.current[imgIndex].style.bottom = 0;
      btnTim = setTimeout(() => {
        heroBtn.current[imgIndex].style.transition = 'opacity 1s, background-color 0.25s, color 0.25s, padding-right 0.25s';
        heroBtn.current[imgIndex].style.opacity = 1;
      }, 1000)
    }, 500)

    // 5000ms + 1500ms to wait for the hero title and progress bar to appear
    intervalTim.current = autoplay && setInterval(() => {
      showNextImage();
    }, 6500);
  
    return () => {
      clearInterval(intervalTim.current);
      clearTimeout(btnTim);
      clearTimeout(heroTextContainerTim);
      if (heroTitle.current[imgIndex]) {
        heroTitle.current[imgIndex].style.bottom = '-200px';
        heroTitle.current[imgIndex].style.transition = 'none';
      };
      if (heroBtn.current[imgIndex]) {
        heroBtn.current[imgIndex].style.opacity = 0;
        heroBtn.current[imgIndex].style.transition = 'none';
      };
    };
  }, [imgIndex]);

  return ( 
    <section>
      <div className="hero-slider">
        <div 
          className="hero-slider__main-img-slider-container"     
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {heroImgs.map(({ url, alt, title, btnText }, i) => (
            <div 
              aria-hidden={imgIndex !== i} 
              style={{transform: `translateX(${-100 * imgIndex}%)`}} 
              key={url} 
              className="hero-slider__main-img-container"
            >
              <img 
                className="hero-slider__main-img"
                src={url} 
                alt={`${alt} ${i + 1}`} 
              />
              <HeroText 
                title={title}
                btnText={btnText}
                right={i % 2 !== 0}
                heroBtn={heroBtn} 
                heroTitle={heroTitle} 
                i={i}
              />
            </div>
          ))}
        </div>
        <div className="hero-slider__navigation-btns-container"> 
          <ul className="hero-slider__navigation-btns-list">
            {heroImgs.map((_, i) => (
              <li key={i}>
                <button 
                  aria-label={`Show image ${i + 1}`}
                  style={i === imgIndex ? {backgroundColor: 'black'} : {backgroundColor: 'white'}}
                  className="hero-slider__navigation-btn" 
                  onClick={() => {
                    setImgIndex(i)
                  }}>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-slider__arrow-btns-container">
          <button aria-label="Show previous image." className="hero-slider__prev-btn" onClick={showPrevImage}>left</button>
          <button aria-label="Show next image." className="hero-slider__next-btn" onClick={showNextImage}>right</button>
        </div>
        <div className="hero-slider__progress-bar-container">
          <div className="hero-slider__progress-bar" ref={progressRef}></div>
        </div>
      </div>
    </section>
  );
}
 
export default HeroSlider;