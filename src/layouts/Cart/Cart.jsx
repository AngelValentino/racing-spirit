import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import CartItemsList from "./components/CartItemsList";

const CartModal = ({ closeBtn }) => {
  const { cartItems } = useShoppingCart();

  return ( 
    <>
      <section className="items-container">
        {cartItems.length === 0 
          ? <p>Your cart is currently empty.</p> 
          : <CartItemsList closeBtn={closeBtn} /> }
      </section>
      <section className="cart-footer">
        <div className="cart-footer__dicount-code-container">
          <div>
            <label className="visually-hidden" htmlFor="cart-footer__discount-code-input">Discount Code</label>
            <input placeholder="Discount code" id="cart-footer__discount-code-input" className="cart-footer__discount-code-input" type="text" />
          </div>
          <button className="cart-footer__dicount-code-btn">Apply</button>
        </div>
        <h2 className="cart-footer__total-container">
          <span className="cart-total__title">SUBTOTAL</span>
          <span className="cart-total__price">{formatCurrency(cartItems.reduce((acc, currItem) => acc + currItem.price * currItem.quantity, 0))}</span>
        </h2>
        <small className="cart-footer__small-text">Shipping, taxes, and discount codes calculated at checkout.</small>
        <button className="cart-footer__checkout-btn">Check out</button>
      </section>
    </>
  );
}
 
export default CartModal;