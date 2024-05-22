import '../../styles/productDetails.css'
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductPreviewSlider from "./components/ProductPreviewSlider";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useModal } from "../../context/ModalContext";
import { useState } from "react";
import ProductBreadcrumbs from './components/ProductBreadcrumbs';

const ProductDetails = () => {
  const { addToCart } = useShoppingCart();
  const { openModal } = useModal();
  const { id } = useParams();
  const { data: jacket, loading, error } = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products/' + id);
  const [ selectedOption, setSelectedOption ] = useState(null);

  function handleChange(e) {
    setSelectedOption(e.target.value);
  }

  return ( 
    <div className='product-details-wrapper'>
      { loading && <p>Loading...</p> }
      { error && <p>{error}</p> }
      {jacket && (
        <>
          <ProductBreadcrumbs jacket={jacket}/>
          <div className="product-details-container">
            <ProductPreviewSlider data={jacket}/>
            <div className="product-details-info">
              <h1>{jacket.title}</h1>
              <h2>{formatCurrency(jacket.price)}</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                addToCart(jacket.id, jacket.title, jacket.price, jacket.images[0].small, selectedOption);
                openModal('cart');
              }}>
                <fieldset>
                  <legend>Sizes</legend>
                  <label htmlFor="small-size">Small</label>
                  <input 
                    required 
                    id="small-size" 
                    name="size" 
                    type="radio" 
                    value="S" 
                    checked={selectedOption === 'S'} 
                    onChange={handleChange}
                  />
                  <label htmlFor="medium-size">Medium</label>
                  <input 
                    required 
                    id="medium-size" 
                    name="size" 
                    type="radio" 
                    value="M" 
                    checked={selectedOption === 'M'} 
                    onChange={handleChange}
                  />
                  <label htmlFor="large-size">Large</label>
                  <input 
                    required 
                    id="large-size" 
                    name="size" 
                    type="radio" 
                    value="L" 
                    checked={selectedOption === 'L'} 
                    onChange={handleChange}
                  />
                </fieldset>
                <button type="submit">Add to cart</button>
              </form>
              <p>{jacket.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
 
export default ProductDetails;