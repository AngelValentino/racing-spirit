import HeroText from "./HeroText";
import { heroImgsData } from "../../../data/heroImgsData";

const HeroImgs = ({ imgIndex, heroBtn, heroTitle, heroVideoRef, autoPlay }) => {

  return ( 
    <>
      {heroImgsData.map(({ url, alt, title, btnText }, i) => (
        <div 
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${heroImgsData.length}`}
          role="tabpanel"
          aria-hidden={imgIndex !== i} 
          inert={imgIndex !== i ? 'true' : null}
          style={{transform: `translateX(${-100 * imgIndex}%)`}} 
          key={url} 
          className="hero-slider__main-img-container"
          id={`hero-slider__item-${i + 1}`}
        >
          {i === 0 
            ? <>
                <video className="hero-slider__main-img" autoPlay muted loop ref={heroVideoRef}>
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="visually-hidden">{alt}</p>
              </>
            : <img 
                className="hero-slider__main-img hero-slider__main-img-displaced"
                src={url} 
                alt={alt} 
              />
          }
          <HeroText 
            title={title}
            btnText={btnText}
            right={i % 2 !== 0}
            heroBtn={heroBtn} 
            heroTitle={heroTitle} 
            imgIndex={imgIndex}
            i={i}
            autoPlay={autoPlay}
          />
        </div>
      ))}
    </>
  );
}
 
export default HeroImgs;