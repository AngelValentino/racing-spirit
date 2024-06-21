import '../../styles/productsCollection.css'
import { useState } from "react";
import SortBy from './componenets/SortBy';
import Products from '../../components/Products';

const ProductsCollection = () => {
  const productsUrl = 'https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products';
  const [ url, setUrl ] = useState(productsUrl)

  return ( 
    <main>
      <header>
        <h1 className="page-title products-collection-title">Jackets</h1> 
      </header>
      <div className="products-collection-filters">
        <SortBy setUrl={setUrl} productsUrl={productsUrl} />
      </div>
      <Products url={url} addClass="products-list-grid"/>
    </main>
  );
}
 
export default ProductsCollection;