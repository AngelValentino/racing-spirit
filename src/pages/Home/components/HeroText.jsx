const HeroText = ({ heroTitle, heroBtn, i, right, title, btnText }) => {
  return ( 
    <div className="hero-slider__hero-text-container">
      <div className={right ? 'hero-slider__hero-text hero-slider__hero-text-right' : 'hero-slider__hero-text'}>
        <div className="hero-slider__hero-title-container">
          <h1 ref={(el) => {
            heroTitle.current[i] = el
          }} className={right ? 'hero-slider__hero-title hero-slider__hero-title-right' : 'hero-slider__hero-title'}>{title.toUpperCase()}</h1>
        </div>
        <button ref={(el) => {
          heroBtn.current[i] = el
        }} className="hero-slider__hero-btn">{btnText.toUpperCase()}</button>
      </div>
    </div>
  );
}
 
export default HeroText;