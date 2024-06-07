import { heroImgsData } from "../../../data/heroImgsData";

const NavigationBtns = ({ imgIndex, setImgIndex }) => {
  return ( 
    <> 
      <ul className="hero-slider__navigation-btns-list">
        {heroImgsData.map((_, i) => (
          <li key={i}>
            <button 
              aria-label={`Show image ${i + 1}`}
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