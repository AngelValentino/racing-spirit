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

  function editQuantity(id, quantity) {
    setCartItems((currItems) => {
      if (quantity < 1 && currItems.find((item) => item.id === id))  {
        return currItems.filter((item) => item.id !== id);
      }
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: quantity };
        } 
        else {
          return item;
        }
      });
    });
  }

  function handleEditQuantity(e, item) {
    if (item.quantity === Number(e.target.value)) {
      // Checks if the input value is the same as the item quantity and returns early if it's true.
      // There's no need to update the item with the same value.
      return;
    }
    if (e.target.value === '') {
      editQuantity(item.id, 1)
      return;
    }
    editQuantity(item.id, Number(e.target.value))
  }

  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } 
        else {
          return item;
        }
      });
    })
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