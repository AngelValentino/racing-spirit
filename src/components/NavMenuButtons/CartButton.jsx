const CartButton = ({openModal, menuType, cartQuantity}) => {
  return ( 
    <button title="cart" aria-label="Open cart." className="nav-menu__cart-btn" onClick={() => {
      openModal(menuType);
    }}>
      <svg aria-hidden="true" className="nav-menu__cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9v20h22V9Zm5 0s0-6 6-6s6 6 6 6" />
      </svg>
      <div aria-label={`You have ${cartQuantity} items in cart.`} className="nav-menu__cart-notif-icon" style={cartQuantity ? {display: "block"} : {display: "none"}}></div>
    </button>
  );
}
 
export default CartButton;