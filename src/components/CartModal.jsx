import { useShoppingCart } from "../context/ShoppingCartContext";

const CartModal = ({closeBtn}) => {
  const { cartItems, removeFromCart } = useShoppingCart();

  return ( 
    <div className="cart-content">
      <div>Cart</div>
      <div className="items-container">
      {cartItems.map((item) => (
          <div key={item.id}>
            <p>item id: {item.id}</p>
            <p>quantity: <strong>{item.quantity}</strong></p>
            <p>{item.title}</p>
            <p>{item.price}</p>
            <p>{item.selectedOption}</p>
            <img src={item.imgUrl} alt="" />
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