import '../../styles/productDetails.css'
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import SkeletonProductDetails from '../../skeletons/SkeletonProductDetails';
import ErrorMessage from '../../components/ErrorMessage';
import ProductInfo from './components/ProductInfo';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: jacket, loading, error } = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products/' + id);

  return ( 
    <div className='product-details-wrapper'>
      { loading && <SkeletonProductDetails /> }
      { error && <ErrorMessage error={error} /> }
      { jacket && <ProductInfo jacket={jacket} /> } 
    </div>
  );
}
 
export default ProductDetails;