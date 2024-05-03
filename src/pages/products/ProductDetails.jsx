import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import ProductPreviewSlider from "../../components/ProductPreviewSlider";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: jacket, loading, error } = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products/' + id);
  return ( 
    <>
      { loading && <p>Loading...</p> }
      { error && <p>{error}</p> }
      {jacket && (
        <>
          <p><Link to="/">Home</Link> &gt; <Link to="/jackets">Jackets</Link> &gt; { jacket.title }</p>
          <ProductPreviewSlider data={jacket}/>
        </>
      )}
    </>
  );
}
 
export default ProductDetails;