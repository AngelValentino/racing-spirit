import { useEffect } from "react";
import ProductCarousel from "../../components/ProductCarousel";
import HeroSlider from "./HeroSlider";
import '../../styles/home.css'

const Home = () => {
  useEffect(() => {
    console.log('on render');
    document.body.querySelector('main').classList.add('main-home');

    return () => {
      console.log('on dismount');
      document.body.querySelector('main').classList.remove('main-home');
    }
  }, [])

  return ( 
    <>
    <HeroSlider />
    <div className="main-home__content">
      <ProductCarousel />
    </div>
    </>
  );
}
 
export default Home;