import '../../styles/productsCollection.css'
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ProductsList from "./componenets/ProductsList";
import SortBy from './componenets/SortBy';
import SkeletonProductsList from '../../skeletons/SkeletonProductsList';
import ErrorMessage from '../../components/ErrorMessage';

const ProductsCollection = () => {
  const productsUrl = 'https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products';
  const [ url, setUrl ] = useState(productsUrl)
  const { data: jackets, loading, error } = useFetch(url);

  return ( 
    <>
      <header>
        <h1 className="products-collection-title">Jackets</h1> 
      </header>
      <div className="products-collection-filters">
        <SortBy setUrl={setUrl} productsUrl={productsUrl}/>
      </div>
      { error && <ErrorMessage error={error} /> }
      { loading && <SkeletonProductsList /> }
      { jackets && <ProductsList data={jackets} /> }
    </>
  );
}
 
export default ProductsCollection;