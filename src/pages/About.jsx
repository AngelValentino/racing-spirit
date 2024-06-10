import Accordion from "../components/Accordion";
import { ProductDetailsFacts } from "../data/ProductDetailsFacts";

const About = () => {
  return ( 
    <>
      <h1>FAQ's</h1>
      <Accordion 
        factsData={ProductDetailsFacts} 
        keepOthersOpen={false} 
        isFaqs={true} 
        ulClass="accordion-faqs"
        btnClass="accordion__faqs-title"
      />
    </>
  );
}
 
export default About;