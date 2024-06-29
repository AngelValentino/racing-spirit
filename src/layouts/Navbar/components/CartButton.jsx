import { useModal } from "../../../context/ModalContext";
import { useShoppingCart } from "../../../context/ShoppingCartContext";

const CartButton = () => {
  const { openModal } = useModal();
  const { cartQuantity } = useShoppingCart();
  
  return ( 
    <button title="Cart" aria-label="Open cart." className="nav-menu__cart-btn" onClick={() => {
      openModal('cart');
    }}>
      <svg aria-hidden="true" role="presentation" focusable="false" className="nav-menu__cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9v20h22V9Zm5 0s0-6 6-6s6 6 6 6" />
      </svg>
      <p className="visually-hidden ">{`You have ${cartQuantity} items in cart.`}</p>
      <div aria-hidden="true" role="presentation" className="nav-menu__cart-notif-icon" style={cartQuantity ? { display: "block" } : { display: "none" }}></div>
    </button>
  );
}
 
export default CartButton;