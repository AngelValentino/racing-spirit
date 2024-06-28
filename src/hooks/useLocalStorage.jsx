import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  /* useState is initialized with a function to avoid 
  running localStorage.getItem on every render. This function 
  will only run on the initial render. */
  const [ value, setValue ] = useState(() => {
    // Check if the item exists in localStorage
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    /* If the item doesn't exist in localStorage, check if the 
    initial value is a callback function; call it if true, 
    otherwise return initialValue */
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });
  
  // Set the item in localStorage whenever the key or value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [ value, setValue ];
}
 
export default useLocalStorage;