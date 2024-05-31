import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

const Product = ({ jacket }) => {

  return ( 
    <li className="product-preview">
      <Link to={`/jackets/${jacket.id}`} onClick={() => {
     
      }}> 
        <div className="product-preview__image-wrapper">
          <img className="product-preview__image" src={jacket.images[0].regular} alt={jacket.title} />
          <img aria-hidden="true" className="product-preview__image-secondary" src={jacket.images[1].regular} alt='' />
        </div>
        <h2 className="product-preview__title">{jacket.title}</h2>
        <h3 className="product-preview__price">{formatCurrency(jacket.price)}</h3>
      </Link>
    </li>
  );
}
 
export default Product;