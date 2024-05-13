import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductPreviewSlider from "../../components/ProductPreviewSlider/ProductPreviewSlider";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useModal } from "../../context/ModalContext";
import { useState } from "react";

const ProductDetails = () => {
  const { addToCart } = useShoppingCart();
  const { openModal } = useModal();
  const { id } = useParams();
  const { data: jacket, loading, error } = useFetch('https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products/' + id);
  const [ selectedOption, setSelectedOption ] = useState(null);

  function handleChange(e) {
    setSelectedOption(e.target.value);
  }

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
            <form onSubmit={(e) => {
              e.preventDefault();
              addToCart(jacket.id, jacket.title, jacket.price, jacket.images[0].small, selectedOption);
              openModal('cart');
            }}>
              <fieldset>
                <legend>Sizes</legend>
                <label htmlFor="small-size">Small</label>
                <input 
                  required 
                  id="small-size" 
                  name="size" 
                  type="radio" 
                  value="s" 
                  checked={selectedOption === 's'} 
                  onChange={handleChange}
                />
                <label htmlFor="medium-size">Medium</label>
                <input 
                  required 
                  id="medium-size" 
                  name="size" 
                  type="radio" 
                  value="m" 
                  checked={selectedOption === 'm'} 
                  onChange={handleChange}
                />
                <label htmlFor="large-size">Large</label>
                <input 
                  required 
                  id="large-size" 
                  name="size" 
                  type="radio" 
                  value="l" 
                  checked={selectedOption === 'l'} 
                  onChange={handleChange}
                />
              </fieldset>
              <button type="submit">Add to cart</button>
            </form>
            <p>{jacket.description}</p>
          </section>
        </div>
      )}
    </>
  );
}
 
export default ProductDetails;