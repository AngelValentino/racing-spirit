import '../../styles/productDetails.css'
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductPreviewSlider from "./components/ProductPreviewSlider";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useModal } from "../../context/ModalContext";
import { useState } from "react";
import ProductBreadcrumbs from './components/ProductBreadcrumbs';
import SizeButton from './components/SizeButton';

const ProductDetails = () => {
  const { addToCart } = useShoppingCart();
  const { openModal } = useModal();
  const { id } = useParams();
  const { data: jacket, loading, error } = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products/' + id);
  const [ selectedOption, setSelectedOption ] = useState('S');
  const [ selected, setIsSelected ] = useState(0)

  const factsData = [{
    title:'description',
    renderContent() {
      return (
        <>
          <p className='accordion__text accordion__description'>{jacket.description}</p>
          <img className='accordion__sizes-chart-img' src="https://cdn.shopify.com/s/files/1/0791/8790/2764/files/Screenshot2023-08-05at20.09.32_480x480.png?v=1691262589" alt="" />
        </>
      )
    } 
  }, {
    title:'composition',
    renderContent() {
      return (
        <p className='accordion__text'>Hand-sewn garmet made locally, only with the finest materials and the greatest tailors.</p>
      )
    } 
  }, {
    title:'washing care',
    renderContent() {
      return (
      <ul className='accordion__wash-care-list'>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M3.486 7.965Q3.738 7.996 4 8c.79.009 1.539-.178 2-.5c.461-.32 1.21-.507 2-.5c.79-.007 1.539.18 2 .5c.461.322 1.21.509 2 .5c.79.009 1.539-.178 2-.5c.461-.32 1.21-.507 2-.5c.79-.007 1.539.18 2 .5c.461.322 1.21.509 2 .5c.17 0 .339-.014.503-.034" />
              <path d="m3 5l1.721 10.329A2 2 0 0 0 6.694 17h10.612a2 2 0 0 0 1.973-1.671L21 5M5 20h14" />
            </g>
          </svg>
          <p className='accordion__text'>Washing machine, delicate cycle, maximum 30º</p>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19h14m1.986-1.977a2 2 0 0 0-.146-.773L13.74 4a2 2 0 0 0-3.5 0l-.815 1.405M7.937 7.973L3.14 16.25A2 2 0 0 0 4.89 19M3 3l18 18" />
          </svg>
          <p className='accordion__text'>Do not use bleach</p>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.048 16.033A9 9 0 0 0 7.954 3.958M5.633 5.64a9 9 0 0 0 12.733 12.723M3 3l18 18" />
          </svg>
          <p className='accordion__text'>Do not use dryer</p>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6h7.459a3 3 0 0 1 2.959 2.507l.577 3.464l.81 4.865A1 1 0 0 1 19.82 18H3a7 7 0 0 1 7-7h9.8M12 15h.01" />
          </svg>
          <p className='accordion__text'>Ironing at low temperature (maximum 110º)</p>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
              <path d="M10 16V8h2.5a2.5 2.5 0 1 1 0 5H10" />
            </g>
          </svg>
          <p className='accordion__text'>Dry clean</p>
        </li>
      </ul>
      )
    } 
  }, {
    title:'shipping information',
    renderContent() {
      return (
        <p className='accordion__text'>We print and despatch all products in house ourselves. We expect all orders to ship within 3 business days and we use tracked shipping services worldwide.</p>
      )
    },
  }, {
    title:'ask a question',
    renderContent() {
      return (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, perspiciatis?
      </p>
      )
    },
  }]

  function handleChange(e) {
    setSelectedOption(e.target.value);
  }

  function toggle(i) {
    if (selected === i) {
      return setIsSelected(null)
    }
    setIsSelected(i);
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
              <p className="product-details__policies">
                Tax included. <Link className="product-details__policies-shipping-link" to="/about">Shipping</Link> calculated at checkout.
              </p>
              <form className='product-details__size-form' onSubmit={(e) => {
                e.preventDefault();
                addToCart(jacket.id, jacket.title, jacket.price, jacket.images[0].small, selectedOption);
                openModal('cart');
              }}>
                <fieldset className='product-details-sizes'>
                  <legend>SIZE</legend>
                  <SizeButton 
                    id="product-details__small-size-input" 
                    value="S" 
                    selectedOption={selectedOption}
                    handleChange={handleChange}
                  />
                  <SizeButton 
                    id="product-details__medium-size-input" 
                    value="M" 
                    selectedOption={selectedOption}
                    handleChange={handleChange}
                  />
                  <SizeButton 
                    id="product-details__large-size-input" 
                    value="L" 
                    selectedOption={selectedOption}
                    handleChange={handleChange}
                  />
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
                <div className='product-details__more-payments-container'>
                  <a className='product-details__more-payments-link' href="#">More payment options</a>
                </div>
              </form>
            
            
              <div className='accordion'>
                {factsData.map((fact, i) => (
                  <div key={i} className={`accordion__section-${fact.title}`}>
                    <button aria-controls={fact.title} className='accordion__title' onClick={() => toggle(i)}>
                      <h2>{fact.title.toUpperCase()}</h2>
                      <svg className={selected === i ? 'accordion__chevron  open-chevron' : 'accordion__chevron '} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                      </svg>
                    </button>
                    <div id={fact.title} aria-expanded={selected === i ? true : false} aria-hidden={selected === i ? false : true} className={selected === i ? 'accordion-content-wrapper open-section' : 'accordion-content-wrapper'}>
                      <div>
                        <div className='accordion-content'>
                          {fact.renderContent()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
 
export default ProductDetails;