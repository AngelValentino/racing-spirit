import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  console.log(cartItems);

  const openCart = () => {
    setIsOpen(true);
  }

  const closeCart = () => {
    setIsOpen(false);
  }

  const cartQuantity = cartItems.reduce((acc, item) => item.quantity + acc, 0);

  function addToCart(id, title, price, imgUrl) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } 
          else {
            return item;
          }
        });
      } 
      else {
        return [...currItems, { id, quantity: 1, title, price, imgUrl}];
      }
    });
  }

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
        isOpen,
        openCart, 
        closeCart, 
        getItemQuantity, 
        addToCart, 
        decreaseCartQuantity, 
        removeFromCart 
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}