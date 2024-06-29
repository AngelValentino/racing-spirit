import { heroImgsData } from "../../../data/heroImgsData";

const NavigationBtns = ({ imgIndex, setImgIndex }) => {
  return ( 
    <> 
      <ul role="tablist" className="hero-slider__navigation-btns-list">
        {heroImgsData.map((_, i) => (
          <li role="presentation" key={i}>
            <button 
              role="tab" 
              aria-selected={i === imgIndex}
              aria-controls={`hero-slider__item-${i + 1}`}
              aria-label={`Show image ${i + 1}.`}
              style={i === imgIndex ? { backgroundColor: '#fff' } : { backgroundColor: '#ffffff5f' }}
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