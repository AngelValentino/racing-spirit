import SkeletonElement from "../skeletons/SkeletonElement";
import SkeletonProduct from "../skeletons/SkeletonProduct";
import SkeletonProductsList from "../skeletons/SkeletonProductsList";

const About = () => {
  return ( 
    <>
     <h1>About us</h1>
     <SkeletonProductsList />
    </>
  );
}
 
export default About;