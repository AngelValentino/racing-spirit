import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Create context for the cart with an empty default value
const ShoppingCartContext = createContext({});

// Custom hook to use ShoppingCartContext
export const useShoppingCart = () => useContext(ShoppingCartContext);

export function ShoppingCartProvider({ children }) {
  const [ cartItems, setCartItems ] = useLocalStorage('cartItems', []);

  const cartQuantity = cartItems.reduce((acc, item) => item.quantity + acc, 0);

  function addToCart(id, title, price, imgUrl, size) {
    // initialize variantId
    const variantId = id + size;

    setCartItems(currItems => {
      // If item already exists in cart, increment quantity
      if (currItems.find(item => item.variantId === variantId)) {
        // update the matched item
        return currItems.map(item => item.variantId === variantId ? { ...item, quantity: item.quantity + 1 } : item);
      } 
      // Otherwise, add new item to cart
      return [...currItems, { id, variantId, quantity: 1, size, title, price, imgUrl}];
    });
  }

  function editQuantity(variantId, quantity) {
    setCartItems(currItems => {
      // If quantity is less than 1 and item exists, remove it from cart
      if (quantity < 1 && currItems.find(item => item.variantId === variantId))  {
        return currItems.filter(item => item.variantId !== variantId);
      }
      // Otherwise, update the quantity of the matched item
      return currItems.map(item => item.variantId === variantId ? { ...item, quantity: quantity } : item);
    });
  }

  function handleEditQuantity(e, variantId, quantity) {
    /* Checks if the input value is the same as the item quantity and returns 
    early if it's true. There is no need to update the item with the same value. */
    if (quantity === Number(e.target.value)) return;
    // If input value is empty, set quantity to 1. Otherwise, update quantity
    e.target.value === '' ?  editQuantity(variantId, 1) : editQuantity(variantId, Number(e.target.value))
  }

  function increaseCartQuantity(variantId) {
    // If item matches the variantId, increase its quantity by 1
    setCartItems(currItems => currItems.map(item => item.variantId === variantId ? { ...item, quantity: item.quantity + 1 } : item));
  }

  function decreaseCartQuantity(variantId) {
    setCartItems(currItems => {
      // Check if the item with the specified variantId exists in the cart
      if (currItems.find(item => item.variantId === variantId).quantity === 1) {
        /* If quantity is 1, remove the item from the cart. As decreasing from 1 
        will result in 0 */ 
        return currItems.filter(item => item.variantId !== variantId);
      } 
      // Otherwise, decrease the quantity of the item by 1
      return currItems.map(item => item.variantId === variantId ? { ...item, quantity: item.quantity - 1 } : item);
    });
  }

  function removeFromCart(variantId) {
    setCartItems(currItems => currItems.filter(item => item.variantId !== variantId));
  }

  return (
    <ShoppingCartContext.Provider value={{ 
        cartItems, 
        cartQuantity, 
        addToCart, 
        decreaseCartQuantity, 
        removeFromCart,
        increaseCartQuantity,
        handleEditQuantity
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}