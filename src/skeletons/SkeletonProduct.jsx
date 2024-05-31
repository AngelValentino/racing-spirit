import SkeletonElement from "./SkeletonElement";

import '../styles/skeleton.css'

const SkeletonProduct = () => {
  return ( 
    <li>
      <SkeletonElement type="thumbnail"/>
      <SkeletonElement type="title"/>
      <SkeletonElement type="text" width="15%"/>
    </li>
  );
}
 
export default SkeletonProduct;