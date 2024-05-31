import { useEffect } from "react";
import ProductCarousel from "../components/ProductCarousel";
import Products from "../components/Products";


const Home = () => {
  const productsUrl = 'https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products?_page=1&_limit=6';

  useEffect(() => {
    console.log('on render');
    document.body.querySelector('main').style.maxWidth = 'none';

    return () => {
      console.log('on dismount');
      document.body.querySelector('main').style.maxWidth = '1300px';
    }
  }, [])
  return ( 
    <>
    <h1>home</h1>
    <div className="main-home__content">
      <ProductCarousel>
        <Products url={productsUrl} carousel={true}/>
      </ProductCarousel>
      
    </div>
    </>
  );
}
 
export default Home;