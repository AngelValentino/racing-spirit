import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const { data: jacket, loading, error } = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products/' + id);

  return ( 
    <>

      { loading && <p>Loading...</p> }
      { error && <p>{error}</p> }
      {jacket && (
        <>
          <p><Link to="/">Home</Link> &gt; <Link to="/jackets">Jackets</Link> &gt; { jacket.title }</p>
          <div>
            <img src={jacket.images[0].regular} alt="" />
            <h2>{jacket.title}</h2>
            <p>{jacket.description}</p>
          </div>
        </>
      )}
    </>
  );
}
 
export default Product;