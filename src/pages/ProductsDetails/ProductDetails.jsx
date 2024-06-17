import '../../styles/productDetails.css'
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ErrorMessage from '../../components/ErrorMessage';
import ProductInfo from './components/ProductInfo';
import Products from '../../components/Products';
import ProductCarousel from '../../components/ProductCarousel';
import BouncingBallsLoader from '../../loaders/BouncingBallsLoader';


const ProductDetails = () => {
  const { id } = useParams();
  const { data: jacket, loading, error } = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products/' + id);
  const productsUrl = 'https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products?_page=1&_limit=6';

  return ( 
    <main>
      <section className="product-details-wrapper">
        { loading && <div className="product-details__loader-container"><BouncingBallsLoader /></div> }
        { error && <ErrorMessage error={error} /> }
        { (!loading && !error) && <ProductInfo jacket={jacket} /> } 
      </section>
      <section className="product-details-recommended">
        <h2 className="product-details-recommended__title">You may also like</h2>
        <Products key={id + 1} url={productsUrl} addClass="recommended-products-list-grid" />
        <ProductCarousel key={id} hidden={true} />
      </section>
    </main>
  );
}
 
export default ProductDetails;