const FooterNewsletter = () => {
  return ( 
    <div className="footer-newsletter">
      <h2>SIGN UP AND SAVE</h2>
      <p className="footer-newsletter__desc">Subscribe to get 10% off your first order, access to special offers, free giveaways, and once-in-a-lifetime deals.</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        e.target.reset();
      }}>
        <div className="footer-newsletter__input-wrapper">
          <label className="footer-newsletter__email-label" aria-label="Enter your email." htmlFor="footer-newsletter__input"> 
            <svg aria-hidden="true" focusable="false" role="img" className="footer-newsletter__email-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
            </svg>
          </label>
          <input required placeholder="Enter your email" type="email" className="footer-newsletter__input" id="footer-newsletter__input"/>
        </div>
        <button className="footer-newsletter__btn" type="submit">Send</button>
      </form>
    </div>
  );
}
 
export default FooterNewsletter;