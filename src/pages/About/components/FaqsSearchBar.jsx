import { useRef } from "react";

const FaqsSearchBar = ({ query, setQuery }) => {
  const searchIcon = useRef(null);
  const closeBtn = useRef(null); 
  
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
  
  return ( 
    <nav className="faqs-nav">
      <h2 className="faqs-nav__title">Frequently Asked Questions</h2>
      <label className="visually-hidden" htmlFor="faqs-title__search-input">Search frequently asked question</label>
      <div className="faqs-title__search-input-container">
        <input value={query} onChange={handleSearchOnChange} onKeyDown={handleClearSearchInputAtEsc} placeholder="Search..." className="faqs-title__search-input" type="text" name="search-input" id="faqs-title__search-input" />
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
  );
}
 
export default FaqsSearchBar;