import { Link } from "react-router-dom";

const ProductBreadcrumbs = ({ jacket }) => {
  return (  
    <ul className='product-breadcrumbs'>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/jackets">Jackets</Link>
      </li>
      <li>
        { jacket.title }
      </li>
    </ul>
  );
}
 
export default ProductBreadcrumbs;