import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { useModal } from "../../../context/ModalContext";
import { useState } from "react";
import { availableSizes } from "../../../data/availableSizes";
import { Link } from "react-router-dom";
import SizeButton from "./SizeButton";

const ProductSizeForm = ({ jacket: { id, title, price, images } }) => {
  const { addToCart } = useShoppingCart();
  const { openModal } = useModal();
  const [ selectedOption, setSelectedOption ] = useState('S');

  function handleChange(e) {
    setSelectedOption(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addToCart(id, title, price, images[0].small, selectedOption);
    openModal('cart');
  }

  return ( 
    <form className="product-details__size-form" onSubmit={handleSubmit}>
      <fieldset className="product-details-sizes">
        <legend>SIZE</legend>
        {availableSizes.map(({ size, abrv }) => (
          <SizeButton 
            key={size}
            id={`product-details__${size}-size-input`} 
            value={abrv} 
            selectedOption={selectedOption}
            handleChange={handleChange}
          />
        ))}
      </fieldset>
      <div className="product-details__sales-points">
        <svg aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m.6-3h16.8M3.6 15h16.8" />
            <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18" />
          </g>
        </svg>
        <p>Free worldwide shipping on orders over £314 / €368 / $400</p>
      </div>
      <button className="arrow-btn-v2 arrow-btn product-details__submit-size-btn" type="submit">Add to cart</button>
      <button type="button" className="product-details__submit-payment">
        Buy with
        <span>
          <img className="product-details__payment-img" src="/assets/images/logos/paypal-logo.png" alt="paypal" />
        </span>
      </button>
      <div className="product-details__more-payments-container">
        <Link className="product-details__more-payments-link slide-in-and-out underline fixed-height" to="/about">More payment options</Link>
      </div>
    </form>
  );
}
 
export default ProductSizeForm;