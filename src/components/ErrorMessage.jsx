const ErrorMessage = ({ error, carousel }) => {
  return ( 
    <div style={carousel ? {marginTop: '0'} : {marginTop: '50px'}}>
      <p className="error__message">{error}</p> 
    </div>
   );
}
 
export default ErrorMessage;