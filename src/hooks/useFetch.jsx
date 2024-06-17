import { useEffect, useState } from "react";

const cache = {};

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Search if the data exists in cache
    if (cache[url]) {
      setData(cache[url]);
      setLoading(false);
      return;
    }

    const abortCont = new AbortController();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then(res => {
          if (!res.ok) throw Error(`Couldn't fetch the products data. ${res.statusText} ${res.status}`);
          return res.json();
        })
        .then(data => {
          // Set cache
          cache[url] = data;
          // Set Data
          setData(data);
          setError(null);
        })
        .catch(err => {
          // If the error is an AbortError, do nothing
          if (err.name === 'AbortError') return;
          console.error(err);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
 
    return () => abortCont.abort();

  }, [url]);
    
  return { data, loading, error };
}
 
export default useFetch;