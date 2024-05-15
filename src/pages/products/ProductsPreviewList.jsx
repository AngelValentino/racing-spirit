import '../../styles/productsPreviewList.css'
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ProductsList from "../../components/ProductsList";

const ProductsPreviewList = () => {
  const productsUrl = 'https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products';
  const [ url, setUrl ] = useState(productsUrl)
  const { data: jackets, loading, error } = useFetch(url);

  return ( 
    <>
      <h1>Jackets</h1> 
      { error && <p>error</p> }
      { loading && <div>loading...</div> }
      
      <button style={{margin: "5px 5px 5px 0"}} onClick={() => {
        setUrl(productsUrl);
      }}>Featured</button>
      <button style={{margin: "0 5px 0 0"}} onClick={() => {
        setUrl(productsUrl + '?_sort=price');
      }}>Ascending price</button>
      <button onClick={() => {
        setUrl(productsUrl + '?_sort=price&_order=desc');
      }}>Descending price</button>
      
      {jackets && <ProductsList data={jackets} />}
    </>
  );
}
 
export default ProductsPreviewList;