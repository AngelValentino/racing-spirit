import '../styles/contactForm.css';

const ContactForm = () => {
  return ( 
    <form className="contact-form" onSubmit={(e) => {
      e.preventDefault();
      e.target.reset();
    }}>
      <div className="contact-form__name-email-container">
        <div> 
          <label className="contact-form__name-label" htmlFor="contact-form__name-input">Name</label>
          <input required className="contact-form__name-input" type="text" name="name" id="contact-form__name-input" />
        </div>
        <div> 
          <label className="contact-form__email-label" htmlFor="contact-form__email-input">Email</label>
          <input required className="contact-form__email-input" type="email" name="email" id="contact-form__email-input" />
        </div>
      </div>
      <label className="contact-form__message-label" htmlFor="contact-form__message-textarea">Message</label>
      <textarea required className="contact-form__message-textarea" name="message" id="contact-form__message-textarea"></textarea>
      <button className="contact-form__submit-btn" type="submit">Send</button>
      <br />
      <p className="contact-form__spam-detection-disclaimer">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
    </form>
  );
}
 
export default ContactForm;