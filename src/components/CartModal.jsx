import { useShoppingCart } from "../context/ShoppingCartContext";

const CartModal = ({closeBtn}) => {
  const { 
    cartItems, 
    removeFromCart, 
    increaseCartQuantity, 
    decreaseCartQuantity, 
    handleEditQuantity 
  } = useShoppingCart();

  return ( 
    <div className="cart-content">
      <div>Cart</div>
      <div className="items-container">
      {cartItems.length === 0 ? <p>Your cart is currently empty.</p> : cartItems.slice().reverse().map((item) => (
          <div key={item.id}>
            <p>item id: {item.id}</p>
            <p>quantity: <strong>{item.quantity}</strong></p>
            <p>{item.title}</p>
            <p>{item.price}</p>
            <p>{item.selectedOption}</p>
            <img src={item.imgUrl} alt="" />
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <button onClick={() => decreaseCartQuantity(item.id)}>-</button>
              <input 
                ref={(lm) => { if (lm) lm.value = item.quantity }} 
                type="number" 
                name="quantity"
                onBlur={(e) => handleEditQuantity(e, item)} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEditQuantity(e, item);
                    // It need the timeout to not trigger the onBlur listener.
                    setTimeout(() => {
                      e.target.blur();
                    })
                  }
                }}
              />
              <button onClick={() => increaseCartQuantity(item.id)}>+</button>
            </div>
            <button onClick={() => {
              closeBtn.current.focus();
              removeFromCart(item.id);
            }}>remove</button>
          </div>
        ))}
      </div>
      <div>total: {cartItems.reduce((acc, currItem) => acc + currItem.price * currItem.quantity, 0)}</div>
    </div>
  );
}
 
export default CartModal;