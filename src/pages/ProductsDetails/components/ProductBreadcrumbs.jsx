import { Link } from "react-router-dom";

const ProductBreadcrumbs = ({ jacket }) => {
  return (  
    <nav aria-label="Breadcrumb">
      <ul className='product-breadcrumb'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/jackets">Jackets</Link>
        </li>
        <li aria-current="page">
          { jacket.title }
        </li>
      </ul>
    </nav>

  );
}
 
export default ProductBreadcrumbs;