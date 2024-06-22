import { useShoppingCart } from "../../../context/ShoppingCartContext";

const CartItemQty = ({ quantity, variantId }) => {
  const { 
    increaseCartQuantity, 
    decreaseCartQuantity, 
    handleEditQuantity 
  } = useShoppingCart();

  function handleEditQuantityOnEnter(e) {
    if (e.key === 'Enter') {
      handleEditQuantity(e, variantId, quantity);
      // It needs the timeout to not trigger the onBlur listener.
      setTimeout(() => {
        e.target.blur();
      });
    }
  }

  return ( 
    <div className="cart-item__qty-wrapper">
      <label className="visually-hidden" htmlFor={`cart-item__qty-input-${variantId}`}>Edit quantity</label>
      <input 
        className="cart-item__qty-input" 
        type="number" 
        id={`cart-item__qty-input-${variantId}`}
        name="quantity" 
        ref={lm => { if (lm) lm.value = quantity }} 
        onBlur={e => handleEditQuantity(e, variantId, quantity)} 
        onKeyDown={handleEditQuantityOnEnter}
      />
      <button aria-controls={`cart-item__qty-input-${variantId}`} aria-label="Remove quantity." title="Remove" className="cart-item__remove-qty-btn" onClick={() => decreaseCartQuantity(variantId)}>
        <svg aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>
      <button aria-controls={`cart-item__qty-input-${variantId}`} aria-label="Add quantity." title="Add" className="cart-item__add-qty-btn" onClick={() => increaseCartQuantity(variantId)}>
        <svg aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </button>
    </div>
  );
}
 
export default CartItemQty;