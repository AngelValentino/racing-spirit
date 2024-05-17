import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "react-router-dom";
import { useModal } from "../context/ModalContext";

const CartModal = ({closeBtn}) => {
  const { 
    cartItems, 
    removeFromCart, 
    increaseCartQuantity, 
    decreaseCartQuantity, 
    handleEditQuantity 
  } = useShoppingCart();
  const { closeModal } = useModal();

  return ( 
    <>
      <div className="items-container">
        {cartItems.length === 0 
          ? <p>Your cart is currently empty.</p> 
          : cartItems.slice().reverse().map(({id, variantId, imgUrl, title, size, price, quantity }) => (
          <div className="cart-item" key={variantId}>
            <Link className="cart-item__product-img-link" to={`/jackets/${id}`} onClick={closeModal}>
              <img className="cart-item__product-img" src={imgUrl} alt={title} />
            </Link>
            <div className="cart-item__details">
              <Link className="cart-item__title" to={`/jackets/${id}`} onClick={closeModal}>
                <h2>{title}</h2>
              </Link>
              <h3 className="cart-item__size"><strong>Size:</strong> {size}</h3>
              <div className="cart-item__qty-price">
                <div className="cart-item__edit-qty-container">
                  <div className="cart-item__qty-wrapper">
                    <input 
                      className="cart-item__edit-qty" 
                      type="number" 
                      name="quantity" 
                      ref={(lm) => { if (lm) lm.value = quantity }} 
                      onBlur={(e) => handleEditQuantity(e, variantId, quantity)} 
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEditQuantity(e, variantId, quantity);
                          // It need the timeout to not trigger the onBlur listener.
                          setTimeout(() => {
                            e.target.blur();
                          })
                        }
                      }}
                    />
                    <button className="cart-item__remove-qty-btn" onClick={() => decreaseCartQuantity(variantId)}>
                      <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                      </svg>
                    </button>
                    <button className="cart-item__add-qty-btn" onClick={() => increaseCartQuantity(variantId)}>
                      <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                      </svg>
                    </button>
                  </div>
                  <button className="cart-item__remove-item-btn" onClick={() => {
                    closeBtn.current.focus();
                    removeFromCart(variantId);
                  }}>
                    <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                    </svg>
                  </button>
                </div>
                <h3 className="cart-item__price">{formatCurrency(price)}</h3>
              </div>
            </div>
          </div>
        ))}
        {cartItems.length != 0 && 
          <>
            <label className="cart-note__label" htmlFor="cart-note">ORDER NOTE</label>
            <textarea className="cart-note__textarea" name="cart-note" id="cart-note"></textarea>  
          </>
        }
      </div>
      <div className="cart-footer">
        <div className="cart-footer__dicount-code-container">
          <div>
            <label className="visually-hidden" htmlFor="cart-footer__discount-code-input">Discount Code</label>
            <input placeholder="Discount code" id="cart-footer__discount-code-input" className="cart-footer__discount-code-input" type="text" />
          </div>
          <button className="cart-footer__dicount-code-btn">Apply</button>
        </div>
        <div className="cart-footer__total-container">
          <h2 className="cart-total__title">SUBTOTAL</h2>
          <h3 className="cart-total__price">{formatCurrency(cartItems.reduce((acc, currItem) => acc + currItem.price * currItem.quantity, 0))}</h3>
        </div>
        <small className="cart-footer__small-text">Shipping, taxes, and discount codes calculated at checkout.</small>
        <button className="cart-footer__checkout-btn">Check out</button>
      </div>
    </>
  );
}
 
export default CartModal;