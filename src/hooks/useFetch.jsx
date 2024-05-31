import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
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
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
          return;
        }
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
    }, 2000)
 
    return () => abortCont.abort();

  }, [url]);
    
  return { data, loading, error };
}
 
export default useFetch;