import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";

const ProductsList = ({ data:jackets }) => {
  return ( 
    <ul className="products-list-container">
      {jackets.map((jacket) => (
        <li className="product-preview" key={jacket.id}>
          <Link to={`/jackets/${jacket.id}`}> 
            <div className="product-preview__image-wrapper">
              <img className="product-preview__image" src={jacket.images[0].regular} alt={jacket.title} />
              <img aria-hidden="true" className="product-preview__image-secondary" src={jacket.images[1].regular} alt='' />
            </div>
            <h2 className="product-preview__title">{jacket.title}</h2>
            <h3 className="product-preview__price">{formatCurrency(jacket.price)}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
 
export default ProductsList;