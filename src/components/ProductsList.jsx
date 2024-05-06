import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

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
            <h3>{formatCurrency(jacket.price)}</h3>
          </div>
        </div> 
      ))}
    </div>
  );
}
 
export default ProductsList;