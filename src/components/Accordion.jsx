import { useState } from "react";

const Accordion = ({ description, factsData }) => {
  const [ selected, setIsSelected ] = useState(0);

  function toggle(i) {
    selected === i ? setIsSelected(null) : setIsSelected(i);
  }
  
  return ( 
    <ul className='accordion'>
      {factsData.map((fact, i) => (
        <li key={i} className={`accordion__section-${fact.title}`}>
          <button aria-expanded={selected === i ? true : false} aria-controls={`accordion__section-${fact.title}`} className='accordion__title' onClick={() => toggle(i)}>
            <h2>{fact.title.toUpperCase()}</h2>
            <svg className={selected === i ? 'accordion__chevron  open-chevron' : 'accordion__chevron '} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
            </svg>
          </button>
          <div id={`accordion__section-${fact.title}`} aria-hidden={selected === i ? false : true} className={selected === i ? 'accordion-content-wrapper open-section' : 'accordion-content-wrapper'}>
            <div>
              <div className='accordion-content'>
                {fact.renderContent(description)}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
 
export default Accordion;