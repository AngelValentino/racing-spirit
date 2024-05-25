import SkeletonElement from "./SkeletonElement";

const SkeletonProductInfo = () => {
  return (  
    <div className="product-details-info">
      <SkeletonElement type="title-large" addClass="complete-width" />
      <SkeletonElement type="title" width="10%" />
      <SkeletonElement type="text" addClass="medium-width" />
      <div className="skeleton-product-details__sizes">
        <SkeletonElement type="small-square" />
        <SkeletonElement type="small-square" />
        <SkeletonElement type="small-square" />
      </div>
      <SkeletonElement type="text" addClass="mb-3 large-width" />
      <SkeletonElement type="btn" addClass="complete-width" />
      <SkeletonElement type="btn" addClass="complete-width mb-3" />
      <SkeletonElement type="text" addClass="center-align small-width mb-5" />
      <SkeletonElement height="65px" addClass="mb-1" />
      <SkeletonElement addClass="mb-1" height="250px" />
      <SkeletonElement height="65px" addClass="mb-1" />
      <SkeletonElement height="65px" addClass="mb-1" />
      <SkeletonElement height="65px" addClass="mb-1" />
    </div>
  );
}
 
export default SkeletonProductInfo;