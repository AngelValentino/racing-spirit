import { useState, useEffect } from "react";
import '../styles/accordion.css';

const Accordion = ({ description, factsData, keepOthersOpen, ulClass, btnClass }) => {
  const [accordionItems, setAccordionItems] = useState(null);

  const isFaqs = ulClass === 'accordion-faqs';

  useEffect(() => {
    if (factsData) {
      // Returns toggled proptery for all facts, first is defaulted to true if isFaqs is false
      setAccordionItems([ 
        ...factsData.map((fact, i) => (
          { ...fact, toggled: isFaqs ? false : i === 0}
        )) 
      ]);
    }

  }, [factsData]);

  const checkToggled = (clickedItem, fact) => clickedItem.id === fact.id ? !fact.toggled : !keepOthersOpen ? false : fact.toggled;

  // Opens or closes the current item and checks if it has to keep the others open or not
  function toggle(clickedItem) {
    setAccordionItems([ 
      ...accordionItems.map(fact => (
        { ...fact, toggled: checkToggled(clickedItem, fact)}
      )) 
    ]);
  }

  const getButtonStyle = (fact) => {
    if (fact.toggled) return { backgroundColor: '#fff' };
    return isFaqs ? { backgroundColor: '#fafafa' } : { backgroundColor: '#fff' };
  };

  return ( 
    <ul className={`accordion ${ulClass}`} >
      {accordionItems?.map((fact, i) => (
        <li key={i}>
          <button 
            aria-expanded={fact.toggled} 
            aria-controls={`accordion__section-${fact.title}`} 
            className={`accordion__title-btn ${btnClass}`} 
            style={getButtonStyle(fact)}
            onClick={() => toggle(fact)}
          >
            <h2>{isFaqs ? fact.title : fact.title.toUpperCase()}</h2>
            {isFaqs 
              ?
                <svg className={fact.toggled ? 'accordion__plus-icon accordion__plus-icon--open' : 'accordion__plus-icon'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              :
                <svg className={fact.toggled ? 'accordion__chevron accordion__chevron--open' : 'accordion__chevron'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
            }
          </button>
          <div 
            role="region" 
            id={`accordion__section-${fact.title}`} 
            aria-hidden={!fact.toggled} 
            className={fact.toggled ? 'accordion__content-container open-accordion-section' : 'accordion__content-container'}
          >
            <div className="accordion__content-wrapper">
              <div className="accordion__content">
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