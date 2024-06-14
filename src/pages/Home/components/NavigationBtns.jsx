import { heroImgsData } from "../../../data/heroImgsData";

const NavigationBtns = ({ imgIndex, setImgIndex }) => {
  return ( 
    <> 
      <ul role="tablist" className="hero-slider__navigation-btns-list">
        {heroImgsData.map((_, i) => (
          <li key={i}>
            <button 
              role="tab"
              aria-controls={`hero-slider__item-${i + 1}`}
              aria-selected={i === imgIndex}
              aria-label={`Show image ${i + 1}.`}
              style={i === imgIndex ? {backgroundColor: 'black'} : {backgroundColor: 'white'}}
              className="hero-slider__navigation-btn" 
              onClick={() => {
                setImgIndex(i);
              }}>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
 
export default NavigationBtns;