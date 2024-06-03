import { useState } from "react";
import '../../styles/home.css'
import useSwipe from "../../hooks/useSwipe";

const HeroSlider = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const heroImgs = [
    'https://placehold.co/1920x1080?text=1',
    'https://placehold.co/1920x1080?text=2',
    'https://placehold.co/1920x1080?text=3'
  ]

  function showPrevImage() {
    setImgIndex((index) => {
      return index === 0
      ? heroImgs.length - 1
      : index - 1;
    });
  }

  function showNextImage() {
    setImgIndex((index) => {
      return index === heroImgs.length - 1
        ? 0
        : index + 1
    })
  }

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(showNextImage, showPrevImage);

  return ( 
    <section>
      <div className="hero-slider">
        <div 
          className="hero-slider__main-img-container"     
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {heroImgs.map((imgUrl, i) => (
            <img 
              key={imgUrl}
              src={imgUrl} 
              alt={`img ${i + 1}`} 
              style={{transform: `translateX(${-100 * imgIndex}%)`}}
              aria-hidden={imgIndex !== i}
            />
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
      </div>
    </section>
  );
}
 
export default HeroSlider;