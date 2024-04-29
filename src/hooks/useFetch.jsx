import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Couldn't fetch the products data.");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          console.log(err);
          setError(err.message)
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }, [url]);
    
  return { data, isLoading, error };
}
 
export default useFetch;