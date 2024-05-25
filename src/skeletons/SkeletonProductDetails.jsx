import SkeletonElement from "./SkeletonElement";
import SkeletonProductInfo from "./SkeletonProductInfo";


const SkeletonProductDetails = () => {
  return ( 
    <>  
      <SkeletonElement type="title" addClass="small-width skeleton-product-details__breadcrumb" />
      <div className="product-details-container">
        <div>
          <SkeletonElement type="thumbnail" addClass="skeleton-product-details__main-img" />
        </div>
        <SkeletonProductInfo />
      </div>
    </>
  );
}
 
export default SkeletonProductDetails;