import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductPreviewSlider from "../../components/ProductPreviewSlider/ProductPreviewSlider";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useModal } from "../../context/ModalContext";

const ProductDetails = () => {
  const { addToCart } = useShoppingCart();
  const { openModal } = useModal();
  const { id } = useParams();
  const { data: jacket, loading, error } = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products/' + id);
  
  return ( 
    <>
      { loading && <p>Loading...</p> }
      { error && <p>{error}</p> }
      {jacket && (
        <div className="product-details-container">
          <div>
            <p><Link to="/">Home</Link> &gt; <Link to="/jackets">Jackets</Link> &gt; { jacket.title }</p>
            <ProductPreviewSlider data={jacket}/>
          </div> 
          <section className="product-details-info">
            <h1>{jacket.title}</h1>
            <h2>{formatCurrency(jacket.price)}</h2>
            <h3>size</h3>
            <fieldset>
              <label htmlFor="small-size">Small</label>
              <input id="small-size" name="size" type="radio" />
              <label htmlFor="medium-size">Medium</label>
              <input id="medium-size" name="size" type="radio" />
              <label htmlFor="large-size">Large</label>
              <input id="large-size" name="size" type="radio" />
            </fieldset>
            <button onClick={() => {
              addToCart(jacket.id);
              openModal('cart');
            }}>Add to cart</button>
            <p>{jacket.description}</p>
          </section>
        </div>
      )}
    </>
  );
}
 
export default ProductDetails;