import '../styles/contact.css'
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return ( 
    <main className="main-contact">
      <h1 className="page-title contact-page-title">Contact us</h1>
      <ContactForm />
    </main>
  );
}
 
export default Contact;