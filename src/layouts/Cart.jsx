import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import CartItemsList from "../components/CartItemsList";

const CartModal = ({closeBtn}) => {
  const { cartItems, } = useShoppingCart();

  return ( 
    <>
      <div className="items-container">
        {cartItems.length === 0 
          ? <p>Your cart is currently empty.</p> 
          : <CartItemsList closeBtn={closeBtn} /> }
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