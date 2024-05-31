import Product from "./Product";

const ProductsList = ({ data:jackets, carousel, addClass}) => {

  return ( 
    <>
      {carousel 
        ? <>
            {jackets.map((jacket) => (
              <Product jacket={jacket} key={jacket.id}/>
            ))}
          </> 
        : <ul className={`products-list-container ${addClass}`}>
            {jackets.map((jacket) => (
              <Product jacket={jacket} key={jacket.id}/>
            ))}
          </ul> 
      }
    </>
  );
}
 
export default ProductsList;