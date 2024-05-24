const SizeButton = ({ id, value, selectedOption, handleChange }) => {
  return ( 
    <>
      <input 
        className={'product-details__size-input'} 
        required 
        id={id} 
        name="size" 
        type="radio" 
        value={value} 
        checked={selectedOption === value} 
        onChange={handleChange}
      />
      <label className='product-details__size-label' htmlFor={id}>{value}</label>
    </>
  );
}
 
export default SizeButton;