const OrderNote = () => {
  return ( 
    <div className="order-note">
      <label className="order-note__label" htmlFor="order-note">ORDER NOTE</label>
      <textarea className="order-note__textarea" name="order-note" id="order-note"></textarea>  
    </div>
  );
}
 
export default OrderNote;