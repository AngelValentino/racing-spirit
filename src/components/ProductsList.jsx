import { Link } from "react-router-dom";

const ProductsList = ({ data:jackets }) => {
  return ( 
    <div className="products-list-container">
      {jackets.map((jacket) => (
        <div className="product-preview" key={jacket.id}>
          <Link className="product-preview__image-wrapper" to={`/jackets/${jacket.id}`}>
              <img className="product-preview__image" src={jacket.images[0].regular} alt={jacket.title} />
              <img className="product-preview__image-secondary" src={jacket.images[1].regular} alt={jacket.title} />
          </Link>
          <h2 className="product-preview__title">{jacket.title}</h2>
          <div className="product-preview__details-wrapper">
            <h3>{jacket.price}$</h3>
            <button className="product-preview__add-to-cart-btn">Add to cart</button>
          </div>
        </div> 
      ))}
    </div>
  );
}
 
export default ProductsList;