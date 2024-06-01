import { useEffect } from "react";
import ProductCarousel from "../components/ProductCarousel";

const Home = () => {

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
      <ProductCarousel />
    </div>
    </>
  );
}
 
export default Home;