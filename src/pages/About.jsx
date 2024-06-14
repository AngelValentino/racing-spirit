import { useEffect, useRef } from "react";
import Accordion from "../components/Accordion";
import { frequentAskedQuestions } from "../data/frequentAskedQuestions";
import '../styles/about.css';

const About = () => {
  const serachInput = useRef(null);
  const searchIcon = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    document.body.querySelector('main').classList.add('main-about');
    return () => document.body.querySelector('main').classList.remove('main-about');
  }, []);

  function showCloseBtn() {
    searchIcon.current.style.display = 'none';
    closeBtn.current.style.display = 'initial'
  }

  function hideCloseBtn() {
    searchIcon.current.style.display = 'initial';
    closeBtn.current.style.display = 'none'
  }

  const handleSearch = (e) => e.target.value !== '' ? showCloseBtn() : hideCloseBtn(); 

  function clearSearchInput() {
    serachInput.current.value = '';
    hideCloseBtn();
  }

  const handleClearSearchInputAtEsc = (e) => e.key === 'Escape' && clearSearchInput();

  return ( 
    <>
      <header>  
        <h1 className="faqs-page-title">FAQ's</h1>
      </header>
      <nav className="faqs-nav">
        <h2 className="faqs-nav__title">Frequently Asked Questions</h2>
        <label className="visually-hidden" htmlFor="faqs-title__search-input">Search frequently asked question</label>
        <div className="faqs-title__search-input-container">
          <input onKeyDown={handleClearSearchInputAtEsc} ref={serachInput} placeholder="Search..." className="faqs-title__search-input" type="text" name="search-input" id="faqs-title__search-input" onChange={handleSearch} />
          <svg ref={searchIcon} aria-hidden="true" focusable="false" role="img" className="faqs-title__search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path fill="currentColor" d="M10.68 11.74a6 6 0 0 1-7.922-8.982a6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275a.75.75 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7" />
          </svg>
          <button title="Clear search input" ref={closeBtn} className="faqs-title__close-icon-btn" aria-label="Clear search input." onClick={clearSearchInput}>
            <svg className="faqs-title__close-icon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fill="currentColor" d="m4.3 2.9l12.8 12.8l-1.4 1.4L2.9 4.3z"></path>
              <path fill="currentColor" d="M17.1 4.3L4.3 17.1l-1.4-1.4L15.7 2.9z"></path>
            </svg>
          </button>
        </div>
      </nav>
      <section>
        <div className="faqs-section-title">
          <svg className="faqs-section-title__svg " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
              <path d="m7.5 4.27l9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7l8.7 5l8.7-5M12 22V12" />
            </g>
          </svg>
          <h2>Delivery</h2>
        </div>
        <Accordion 
          factsData={frequentAskedQuestions.delivery} 
          keepOthersOpen={false} 
          isFaqs={true} 
          ulClass="accordion-faqs"
          btnClass="accordion__faqs-title-btn"
        />
      </section>
      <section>
        <div className="faqs-section-title">
          <svg className="faqs-section-title__svg faqs-star-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
          <h2>Orders and Payment</h2>
        </div>
        <Accordion 
          factsData={frequentAskedQuestions.ordersAndPayment} 
          keepOthersOpen={false} 
          isFaqs={true} 
          ulClass="accordion-faqs"
          btnClass="accordion__faqs-title-btn"
        />
      </section>
      <section>
        <div className="faqs-section-title">
          <svg className="faqs-section-title__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeWidth="1.5" d="m18 18l-3-3M9 9L6 6m9 3l3-3M6 18l3-3m12-3a9 9 0 1 1-18 0a9 9 0 0 1 18 0zm-5 0a4 4 0 1 1-8 0a4 4 0 0 1 8 0z" />
          </svg>
          <h2>Support</h2>
        </div>
        <Accordion 
          factsData={frequentAskedQuestions.support} 
          keepOthersOpen={false} 
          isFaqs={true} 
          ulClass="accordion-faqs"
          btnClass="accordion__faqs-title-btn"
        />
      </section>
    </>
  );
}
 
export default About;