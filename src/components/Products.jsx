import useFetch from "../hooks/useFetch";
import ProductsList from "./ProductsList";
import SkeletonProductsList from "../skeletons/SkeletonProductsList";
import ErrorMessage from "./ErrorMessage";
import { useRef } from "react";


const Products = ({ url, carousel, addClass }) => {
  const { data: jackets, loading, error } = useFetch(url);
  const shuffle = useRef(false)

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  if (jackets && addClass !== 'products-list-grid') {
    if (!shuffle.current) {
      shuffleArray(jackets);
      shuffle.current = true;
    }
  };
 
  return ( 
    <>
      { error && <ErrorMessage error={error} carousel={carousel} /> }
      { loading && <SkeletonProductsList carousel={carousel} addClass={addClass}/> }
      { (!loading && !error) && <ProductsList data={jackets} carousel={carousel} addClass={addClass} /> }
    </>
  );
}
 
export default Products;