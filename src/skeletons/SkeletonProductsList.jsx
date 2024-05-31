import SkeletonProduct from "./SkeletonProduct";

const SkeletonProductsList = ({ carousel, addClass }) => {

  let testArr = addClass === 'products-list-grid' 
    ? [...Array(8).keys()] 
    : [...Array(6).keys()]
  
  return (
  <>
    {carousel 
      ? <>
          {testArr.map((n) => (
            <SkeletonProduct key={n} carousel={carousel}/>
          ))}
        </>
      : <ul className={`products-list-container ${addClass}`}>
          {testArr.map((n) => (
            <SkeletonProduct key={n} carousel={carousel}/>
          ))}
        </ul>
    }
  </>
  );
}
 
export default SkeletonProductsList;