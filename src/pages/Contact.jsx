import '../styles/contact.css'
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return ( 
    <main className="main-contact">
      <header>
        <h1 className="page-title contact-page-title">Contact us</h1>
      </header>
      <ContactForm />
    </main>
  );
}
 
export default Contact;