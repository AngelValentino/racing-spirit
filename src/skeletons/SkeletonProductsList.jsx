import SkeletonProduct from "./SkeletonProduct";

const SkeletonProductsList = ({ carousel, addClass }) => {
  const loadingProductsEmptyArr = addClass === 'products-list-grid' 
    ? [...Array(8).keys()] 
    : [...Array(6).keys()];
  
  return (
  <>
    {carousel 
      ? <>
          {loadingProductsEmptyArr.map(n => (
            <SkeletonProduct key={n} carousel={carousel}/>
          ))}
        </>
      : <ul className={`products-list-container ${addClass}`}>
          {loadingProductsEmptyArr.map(n => (
            <SkeletonProduct key={n} carousel={carousel}/>
          ))}
        </ul>
    }
  </>
  );
}
 
export default SkeletonProductsList;