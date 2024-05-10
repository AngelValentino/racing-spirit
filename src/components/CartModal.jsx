import { useShoppingCart } from "../context/ShoppingCartContext";

const CartModal = ({closeBtn}) => {
  const { cartItems, removeFromCart } = useShoppingCart();

  return ( 
    <>
     {cartItems.map((item) => (
        <div key={item.id}>
          <p>item id: {item.id}</p>
          <p>quantity: {item.quantity}</p>
          <button onClick={() => {
            closeBtn.current.focus();
            removeFromCart(item.id);
          }}>remove</button>
        </div>
      ))}
    </>
  );
}
 
export default CartModal;