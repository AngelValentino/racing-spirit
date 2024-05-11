import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}) {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  console.log(cartItems);

  const cartQuantity = cartItems.reduce((acc, item) => item.quantity + acc, 0);

  function addToCart(id, title, price, imgUrl, selectedOption) {
    const newId = id + selectedOption;

    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === newId && item.selectedOption === selectedOption)) {
        return currItems.map((item) => {
          if (item.id === newId) {
            return { ...item, quantity: item.quantity + 1 };
          } 
          else {
            return item;
          }
        });
      } 
      else {
        return [...currItems, { id: id + selectedOption, quantity: 1, selectedOption, title, price, imgUrl}];
      }
    });
  }

  // needs work
  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id).quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } 
      else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } 
          else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((currItems) => {
      console.log(id)
      return currItems.filter((item) => item.id !== id);
    });
  }

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  return (
    <ShoppingCartContext.Provider value={{ 
        cartItems, 
        cartQuantity, 
        getItemQuantity, 
        addToCart, 
        decreaseCartQuantity, 
        removeFromCart 
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}