import Accordion from "../../../components/Accordion";
import Highlighter from "./Highlighter";

const FaqsSection = ({ query, data, title }) => {
  function pickFaqsSectionTitleIcon(title) {
    switch(title.toLowerCase()) {
      case 'delivery':
        return (
          <svg aria-hidden="true" focusable="false" role="presentation" className="faqs-section-title__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
              <path d="m7.5 4.27l9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7l8.7 5l8.7-5M12 22V12" />
            </g>
          </svg>
        );
      case 'orders and payment':
        return (
          <svg aria-hidden="true" focusable="false" role="presentation" className="faqs-section-title__svg faqs-star-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        );
      case 'support':
        return (
          <svg aria-hidden="true" focusable="false" role="presentation" className="faqs-section-title__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="1.5" d="m18 18l-3-3M9 9L6 6m9 3l3-3M6 18l3-3m12-3a9 9 0 1 1-18 0a9 9 0 0 1 18 0zm-5 0a4 4 0 1 1-8 0a4 4 0 0 1 8 0z" />
          </svg>
        );
    }
  }

  return ( 
    <section>
      <div className="faqs-section-title">
        {pickFaqsSectionTitleIcon(title)}
        <h2>
          <Highlighter highlight={query}>{title}</Highlighter>
        </h2>
      </div>
      <Accordion 
        factsData={data} 
        keepOthersOpen={false} 
        isFaqs={true} 
        ulClass="accordion-faqs"
        btnClass="accordion__faqs-title-btn"
        query={query}
      />
    </section>
);
}
 
export default FaqsSection;