import HeroText from "./HeroText";
import { heroImgsData } from "../../../data/heroImgsData";

const HeroImgs = ({ imgIndex, heroBtn, heroTitle, heroVideo }) => {

  return ( 
    <>
      {heroImgsData.map(({ url, alt, title, btnText }, i) => (
        <div 
          aria-hidden={imgIndex !== i} 
          inert={imgIndex !== i ? 'true' : null}
          style={{transform: `translateX(${-100 * imgIndex}%)`}} 
          key={url} 
          className="hero-slider__main-img-container"
        >
          {i === 0 
          ? <video onClick={() => console.log('click')} className="hero-slider__main-img" autoPlay muted loop src={url} ref={heroVideo}/> 
          : <img 
              className="hero-slider__main-img"
              src={url} 
              alt={`${alt} ${i + 1}`} 
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
          />
        </div>
      ))}
    </>
  );
}
 
export default HeroImgs;