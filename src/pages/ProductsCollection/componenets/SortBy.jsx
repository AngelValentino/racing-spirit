const SortBy = ({ setUrl, productsUrl }) => {
  function handleSelect(e) {
    switch (e.target.value) {
      case 'featured':
        // Set URL to default products URL (reset sorting)
        setUrl(productsUrl);
        break;
      case 'price-descending':
        // Set URL to sort products by descending price
        setUrl(productsUrl + '?_sort=price&_order=desc');
        break;
      case 'price-ascending':
        // Set URL to sort products by ascending price
        setUrl(productsUrl + '?_sort=price');
        break;
    }
  }
 
  return ( 
    <div className="sort-by">
      <label className="visually-hidden" htmlFor="sort-by__select">Sort products.</label>
      <select className="sort-by__select" name="sort-by" id="sort-by__select" onChange={handleSelect}>
        <option value="featured">Featured</option>
        <option value="price-descending">Price, high to low</option>
        <option value="price-ascending">Price, low to high</option>
      </select>
      <div className="sort-by__arrow-wrapper">
        <svg className="sort-by__arrow-icon" aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
      </div>
    </div>
  );
}
 
export default SortBy;