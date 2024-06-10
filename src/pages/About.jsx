import Accordion from "../components/Accordion";
import { productDetailsFacts } from "../data/productDetailsFacts";
import { frequentAskedQuestions } from "../data/frequentAskedQuestions";

console.log(frequentAskedQuestions)

const About = () => {
  return ( 
    <>
      <h1>FAQ's</h1>
      <section>
        <h2>Delivery</h2>
        <Accordion 
          factsData={frequentAskedQuestions.delivery} 
          keepOthersOpen={false} 
          isFaqs={true} 
          ulClass="accordion-faqs"
          btnClass="accordion__faqs-title-btn"
        />
      </section>
      <section>
        <h2>Orders and Payment</h2>
        <Accordion 
          factsData={frequentAskedQuestions.ordersAndPayment} 
          keepOthersOpen={false} 
          isFaqs={true} 
          ulClass="accordion-faqs"
          btnClass="accordion__faqs-title-btn"
        />
      </section>
      <section>
        <h2>Support</h2>
        <Accordion 
          factsData={frequentAskedQuestions.support} 
          keepOthersOpen={false} 
          isFaqs={true} 
          ulClass="accordion-faqs"
          btnClass="accordion__faqs-title-btn"
        />
      </section>

    </>
  );
}
 
export default About;