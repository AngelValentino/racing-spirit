import SkeletonElement from "./SkeletonElement";

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