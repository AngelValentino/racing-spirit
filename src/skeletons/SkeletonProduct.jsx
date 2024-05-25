import SkeletonElement from "./SkeletonElement";

import '../styles/skeleton.css'

const SkeletonProduct = () => {
  return ( 
    <div>
      <SkeletonElement type="thumbnail"/>
      <SkeletonElement type="title"/>
      <SkeletonElement type="text" width="15%"/>
    </div>
  );
}
 
export default SkeletonProduct;