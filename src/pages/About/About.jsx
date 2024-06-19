import { useRef, useState, useEffect } from "react";
import { frequentAskedQuestions } from "../../data/frequentAskedQuestions";
import '../../styles/about.css';
import FaqsSection from "./components/FaqsSection";

const About = () => {
  const searchInput = useRef(null);
  const searchIcon = useRef(null);
  const closeBtn = useRef(null); 
  const [ query, setQuery ] = useState('');
  const [ filteredItems, setFilteredItems ] = useState(frequentAskedQuestions);

  const removeWhiteSpace = (str) => str.replace(/\s+/g, '');
  const formatString = (str) => str.toLowerCase().trim();
  const isStrFound = (val, searchVal, searchValNoWhiteSpace) => formatString(val).includes(searchValNoWhiteSpace ? removeWhiteSpace(formatString(searchVal)) : formatString(searchVal));

  useEffect(() => {
    const newFilteredItems = {};
    for (const section in frequentAskedQuestions) {
      newFilteredItems[section] = frequentAskedQuestions[section]
        .filter(item => isStrFound(item.title, query) || isStrFound(section, query, true));
    }
    setFilteredItems(newFilteredItems);
  }, [query]);

  function showCloseBtn() {
    searchIcon.current.style.display = 'none';
    closeBtn.current.style.display = 'initial'
  }

  function hideCloseBtn() {
    searchIcon.current.style.display = 'initial';
    closeBtn.current.style.display = 'none';
  }

  const handleSearchIcon = e => e.target.value !== '' ? showCloseBtn() : hideCloseBtn(); 

  function handleSearchOnChange(e) {
    setQuery(e.target.value);
    handleSearchIcon(e);
  }

  function clearSearchInput() {
    setQuery('');
    hideCloseBtn();
  }

  const handleClearSearchInputAtEsc = e => e.key === 'Escape' && clearSearchInput();

  function checkEmptyFaqs() {
    return (
      filteredItems.delivery.length === 0 &&
      filteredItems.ordersAndPayment.length === 0 &&
      filteredItems.support.length === 0 
    );
  }

  return ( 
    <main className="main-about">
      <header>  
        <h1 className="faqs-page-title">FAQ's</h1>
      </header>
      <nav className="faqs-nav">
        <h2 className="faqs-nav__title">Frequently Asked Questions</h2>
        <label className="visually-hidden" htmlFor="faqs-title__search-input">Search frequently asked question</label>
        <div className="faqs-title__search-input-container">
          <input value={query} onChange={handleSearchOnChange} onKeyDown={handleClearSearchInputAtEsc} ref={searchInput} placeholder="Search..." className="faqs-title__search-input" type="text" name="search-input" id="faqs-title__search-input" />
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
      { checkEmptyFaqs() && <p className="no-faqs-found">No search results found</p>} 
      { filteredItems.delivery.length !== 0 && <FaqsSection query={query} data={filteredItems.delivery} title="Delivery" /> }
      { filteredItems.ordersAndPayment.length !== 0 && <FaqsSection query={query} data={filteredItems.ordersAndPayment} title="Orders and Payment" /> } 
      { filteredItems.support.length !== 0 && <FaqsSection query={query} data={filteredItems.support} title="Support" /> }
    </main>
  );
}
 
export default About;