import SkeletonProduct from "./SkeletonProduct";

const SkeletonProductsList = () => {
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8];
  
  return (
  <div className="products-list-container">
    {testArr.map((n) => (
      <SkeletonProduct key={n}/>
    ))}
  </div>
  );
}
 
export default SkeletonProductsList;