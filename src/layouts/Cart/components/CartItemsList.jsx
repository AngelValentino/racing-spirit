import { useModal } from "../../../context/ModalContext";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Link } from "react-router-dom";
import CartItemQty from "./CartItemQty";
import OrderNote from "./OrderNote";

const CartItemsList = ({ closeBtn }) => {
  const { cartItems, removeFromCart } = useShoppingCart();
  const { closeModal } = useModal();

  return ( 
    <>
      <ul>
        {cartItems.slice().reverse().map(({ id, variantId, imgUrl, title, size, price, quantity }) => (
          <li className="cart-item" key={variantId}>
            <Link aria-label="See product details." className="cart-item__product-img-link" to={`/jackets/${id}`} onClick={closeModal}>
              <img className="cart-item__product-img" src={imgUrl} alt={title} />
            </Link>
            <div className="cart-item__details">
              <Link aria-label="See product details." className="cart-item__title" to={`/jackets/${id}`} onClick={closeModal}>
                <h2>{title}</h2>
              </Link>
              <h3 className="cart-item__size"><strong>Size: </strong>{size}</h3>
              <div className="cart-item__qty-price">
                <div className="cart-item__qty-input-container">
                  <CartItemQty quantity={quantity} variantId={variantId}/>
                  <button aria-label="Delete item." title="Delete item" className="cart-item__remove-item-btn" onClick={() => {
                    closeBtn.current.focus();
                    removeFromCart(variantId);
                  }}>
                    <svg aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path fill="currentColor" d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                    </svg>
                  </button>
                </div>
                <h3 className="cart-item__price">{formatCurrency(price)}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <OrderNote />
    </>
  );
}
 
export default CartItemsList;