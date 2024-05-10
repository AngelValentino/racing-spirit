import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    if (typeof initialValue === "function") {
      return initialValue();
    } 
    else {
      return initialValue;
    }
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
 
export default useLocalStorage;