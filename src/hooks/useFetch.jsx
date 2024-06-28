import { useEffect, useState } from "react";

const cache = {};

const useFetch = url => {
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    // Check if the data for the given URL is already in the cache
    if (cache[url]) {
      setData(cache[url]);
      setLoading(false);
      return;
    }

    // Create an AbortController to allow aborting the fetch request
    const abortCont = new AbortController();
    // Reset loading state and clear any previous errors for edge cases
    setLoading(true);
    setError(null);

    // Fetch data from the given URL
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
 
    return () => abortCont.abort();

  }, [url]);
    
  return { data, loading, error };
}
 
export default useFetch;