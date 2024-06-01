const ErrorMessage = ({ error, addClass }) => {
  return ( 
    <div className={addClass === 'recommended-products-list-grid' ? 'error__container hidden-error-message' : 'error__container'}>
      <p className="error__message">{error}</p> 
    </div>
   );
}
 
export default ErrorMessage;