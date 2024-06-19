import { useState, useEffect } from "react";
import { frequentAskedQuestions } from "../../data/frequentAskedQuestions";
import '../../styles/about.css';
import FaqsSection from "./components/FaqsSection";
import FaqsSearchBar from "./components/FaqsSearchBar";

const About = () => {
  const [ query, setQuery ] = useState('');
  const [ filteredItems, setFilteredItems ] = useState(frequentAskedQuestions);

  const removeWhiteSpace = str => str.replace(/\s+/g, '');

  const formatString = str => str.toLowerCase().trim();

  const isStrFound = (val, searchVal, searchValNoWhiteSpace) => formatString(val).includes(searchValNoWhiteSpace ? removeWhiteSpace(formatString(searchVal)) : formatString(searchVal));

  useEffect(() => {
    const newFilteredItems = {};
    for (const section in frequentAskedQuestions) {
      newFilteredItems[section] = frequentAskedQuestions[section]
        .filter(item => isStrFound(item.title, query) || isStrFound(section, query, true));
    }
    setFilteredItems(newFilteredItems);
  }, [query]);

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
      <FaqsSearchBar query={query} setQuery={setQuery} />
      { checkEmptyFaqs() && <p className="no-faqs-found">No search results found</p>} 
      { filteredItems.delivery.length !== 0 && <FaqsSection query={query} data={filteredItems.delivery} title="Delivery" /> }
      { filteredItems.ordersAndPayment.length !== 0 && <FaqsSection query={query} data={filteredItems.ordersAndPayment} title="Orders and Payment" /> } 
      { filteredItems.support.length !== 0 && <FaqsSection query={query} data={filteredItems.support} title="Support" /> }
    </main>
  );
}
 
export default About;