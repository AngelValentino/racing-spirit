import '../../styles/productDetails.css'
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import SkeletonProductDetails from '../../skeletons/SkeletonProductDetails';
import ErrorMessage from '../../components/ErrorMessage';
import ProductInfo from './components/ProductInfo';
import Products from '../../components/Products';
import ProductCarousel from '../../components/ProductCarousel';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: jacket, loading, error } = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products/' + id);
  const productsUrl = 'https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products?_page=1&_limit=6';

  return ( 
    <div>
      <section className="product-details-wrapper">
        { loading && <SkeletonProductDetails /> }
        { error && <ErrorMessage error={error} /> }
        { (!loading && !error) && <ProductInfo jacket={jacket} /> } 
      </section>
      <section className="product-details-recommended">
        <h2 className="product-details-recommended__title">You may also like</h2>
        <Products key={id + 1} url={productsUrl} addClass="recommended-products-list-grid" />
        <ProductCarousel key={id} hidden={true} />
      </section>
    </div>
  );
}
 
export default ProductDetails;