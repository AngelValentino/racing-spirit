import '../../styles/about.css';
import { useState, useEffect } from "react";
import { frequentAskedQuestions } from "../../data/frequentAskedQuestions";
import FaqsSection from "./components/FaqsSection";
import FaqsSearchBar from "./components/FaqsSearchBar";

const About = () => {
  const [ query, setQuery ] = useState('');
  const [ filteredItems, setFilteredItems ] = useState(frequentAskedQuestions);

  // Helper function to format a string to lowercase and trim white space
  const formatString = str => str.toLowerCase().trim();

  // Checks if 'val' includes 'searchVal' after optional whitespace removal.
  const isStrFound = (val, searchVal) => formatString(val).includes(formatString(searchVal));

  function camelCaseToWords(str) {
    if (!str) return '';
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2') // insert space before capital letters
  }

  // Filter FAQs items based on the search query
  useEffect(() => {
    const newFilteredItems = {}; // Initialize new filtered items object

    // Filter items in each section based on the search query
    for (const sectionKey in frequentAskedQuestions) {
      newFilteredItems[sectionKey] = frequentAskedQuestions[sectionKey]
        .filter(faqsItem => isStrFound(faqsItem.title, query) || isStrFound(camelCaseToWords(sectionKey), query));
    }

    setFilteredItems(newFilteredItems); // Update filteredItems state with the filtered items
  }, [query]);

  // Check if all FAQs sections are empty
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
        <h1 className="page-title faqs-page-title">FAQ's</h1>
      </header>
      <FaqsSearchBar query={query} setQuery={setQuery} />
      { checkEmptyFaqs() && <p className="no-faqs-found">No search results found</p>} 
      { filteredItems.delivery.length !== 0 && <FaqsSection query={query} data={filteredItems.delivery} title="Delivery" /> }
      { filteredItems.ordersAndPayment.length !== 0 && <FaqsSection query={query} data={filteredItems.ordersAndPayment} title="Orders and Payment" /> } 
      { filteredItems.support.length !== 0 && <FaqsSection query={query} data={filteredItems.support} title="Support" /> }
    </main>
  );
}
 
export default About;