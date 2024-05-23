import '../../styles/productDetails.css'
import { Link, useParams } from "react-router-dom";
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
  const [ selectedOption, setSelectedOption ] = useState('S');

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
              <h1 className="product-details__title">{jacket.title}</h1>
              <h2 className="product-details__price">{formatCurrency(jacket.price)}</h2>
              <p className="product-details__policies">Tax included. <Link to="/about">Shipping</Link> calculated at checkout.</p>
              <form className='product-details__size-form' onSubmit={(e) => {
                e.preventDefault();
                addToCart(jacket.id, jacket.title, jacket.price, jacket.images[0].small, selectedOption);
                openModal('cart');
                console.log(e.target)
              }}>
                <fieldset className='product-details-sizes'>
                  <legend>SIZE</legend>
                  <input
                    className='product-details__size' 
                    required 
                    id="small-size" 
                    name="size" 
                    type="radio" 
                    value="S" 
                    checked={selectedOption === 'S'} 
                    onChange={handleChange}
                  />
                  <label className='product-details__size-label' htmlFor="small-size">S</label>

                  <input
                    className='product-details__size' 
                    required 
                    id="medium-size" 
                    name="size" 
                    type="radio" 
                    value="M" 
                    checked={selectedOption === 'M'} 
                    onChange={handleChange}
                  />
                  <label className='product-details__size-label' htmlFor="medium-size">M</label>
                  
                  <input 
                    className='product-details__size' 
                    required 
                    id="large-size" 
                    name="size" 
                    type="radio" 
                    value="L" 
                    checked={selectedOption === 'L'} 
                    onChange={handleChange}
                  />
                  <label className='product-details__size-label' htmlFor="large-size">L</label>

                </fieldset>
                <div className="product-details__icon-and-text">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m.6-3h16.8M3.6 15h16.8" />
                      <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18" />
                    </g>
                  </svg>
                  <p>Free worldwide shipping on orders over £314 / €368 / $400</p>
                </div>
                <button className='product-details__submit-size-btn' type="submit">Add to cart</button>
                <button type='button' className='product-details__submit-payment'>
                  Buy with
                  <span>
                    <img className='product-details__payment-img' src="../../images/paypal-logo.png" alt="" />
                  </span>
                </button>
                <a className='product-details__more-payments' href="#">More payment options</a>
              </form>
           
              <p className='prodctu-details__description'>{jacket.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
 
export default ProductDetails;