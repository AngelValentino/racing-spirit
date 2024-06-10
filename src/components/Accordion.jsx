import { useState, useEffect } from "react";

const Accordion = ({ description, factsData, keepOthersOpen }) => {
  const [accordionItems, setAccordionItems] = useState(null);

  useEffect(() => {
    if (factsData) {
      // Returns toggled proptery for all items, first is defaulted to true
      setAccordionItems([ ...factsData.map((fact, i) => ({ ...fact, toggled: i === 0 })) ]);
    }

  }, [factsData]);

  const checkToggled = (clickedItem, fact) => clickedItem.id === fact.id ? !fact.toggled : !keepOthersOpen ? false : fact.toggled;

  // Opens or closes the current item and checks if it has to keep the others open or not
  function toggle(clickedItem) {
    setAccordionItems([ ...accordionItems.map(fact => ({ ...fact, toggled: checkToggled(clickedItem, fact) })) ]);
  }
  
  return ( 
    <ul className="accordion">
      {accordionItems?.map((fact, i) => (
        <li key={i} className={`accordion__section-${fact.title}`}>
          <button aria-expanded={fact.toggled} aria-controls={`accordion__section-${fact.title}`} className='accordion__title' onClick={() => toggle(fact)}>
            <h2>{fact.title.toUpperCase()}</h2>
            <svg className={fact.toggled ? 'accordion__chevron open-chevron' : 'accordion__chevron'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
            </svg>
          </button>
          <div role="region" id={`accordion__section-${fact.title}`} aria-hidden={!fact.toggled} className={fact.toggled ? 'accordion-content-wrapper open-section' : 'accordion-content-wrapper'}>
            <div>
              <div className="accordion-content">
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