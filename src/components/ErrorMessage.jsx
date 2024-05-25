const ErrorMessage = ({ error }) => {
  return ( 
    <div className='error__container'>
      <p className='error__message'>{error}</p> 
    </div>
   );
}
 
export default ErrorMessage;