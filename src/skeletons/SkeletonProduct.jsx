import SkeletonElement from "./SkeletonElement";

import '../styles/skeleton.css'

const SkeletonProduct = () => {
  return ( 
    <div>
      <SkeletonElement type="thumbnail"/>
      <SkeletonElement type="title"/>
      <SkeletonElement type="text" addClass="first-skeleton-text"/>
    </div>
  );
}
 
export default SkeletonProduct;