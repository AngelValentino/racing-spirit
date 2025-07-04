import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HeroText = ({ i, right, title, btnText, imgIndex, autoPlay }) => {
  const [ isTitleStyled, setIsTitleStyled ] = useState(false);
  const [ isButtonStyled, setIsButtonStyled ] = useState(false);

  // Handle animation timings and cleanup
  useEffect(() => {
    // Timeout for title animation
    const titleTim = setTimeout(() => {
      setIsTitleStyled(true);
    }, 500);

    // Timeout for button animation
    const buttonTim = setTimeout(() => {
      setIsButtonStyled(true);
    }, 1500);

    // Cleanup function to clear timeouts and reset animation states
    return () => {
      clearTimeout(titleTim);
      clearTimeout(buttonTim);
      setIsTitleStyled(false);
      setIsButtonStyled(false);
    }
  }, [imgIndex, autoPlay])
  
  return ( 
    <div className="hero-slider__hero-text-container">
      <div className={right ? 'hero-slider__hero-text hero-slider__hero-text-right' : 'hero-slider__hero-text'}>
        <div className="hero-slider__hero-title-container">
          <h1 
            style={imgIndex === i && isTitleStyled ? { bottom: 0 } : { visibility: 'hidden' }} 
            className={right ? 'hero-slider__hero-title hero-slider__hero-title-right' : 'hero-slider__hero-title'}
          >
            {title.toUpperCase()}
          </h1>
        </div>
        <Link
          style={imgIndex === i && isButtonStyled ? { opacity: 1 } : { visibility: 'hidden' }} 
          className="arrow-btn-v1 arrow-btn hero-slider__hero-btn" to="/jackets" 
        >
          {btnText.toUpperCase()}
        </Link>
      </div>
    </div>
  );
}
 
export default HeroText;