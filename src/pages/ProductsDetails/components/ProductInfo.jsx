import ProductBreadcrumbs from "./ProductBreadcrumbs";
import ProductPreviewSlider from "./ProductPreviewSlider";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Link } from "react-router-dom";
import ProductSizeForm from "./ProductSizeForm";
import Accordion from "../../../components/Accordion";
import { ProductDetailsFacts } from "../../../data/ProductDetailsFacts";

const ProductInfo = ({ jacket }) => {
  return ( 
    <>
      <ProductBreadcrumbs jacket={jacket}/>
      <div className="product-details-container">
        <ProductPreviewSlider data={jacket}/>
        <div className="product-details-info">
          <h1 className="product-details__title">{jacket.title}</h1>
          <h2 className="product-details__price">{formatCurrency(jacket.price)}</h2>
          <p className="product-details__policies">
            Tax included. <Link className="product-details__policies-shipping-link" to="/about">Shipping</Link> calculated at checkout.
          </p>
          <ProductSizeForm jacket={jacket}/>
          <Accordion 
            keepOthersOpen={true} 
            description={jacket.description} 
            factsData={ProductDetailsFacts} 
            btnClass="accordion__product-details-title-btn"
            ulClass="accordion-product-details"
          />
        </div>
      </div>
    </>
  );
}
 
export default ProductInfo;