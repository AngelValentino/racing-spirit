const ProductThumbsList = ({jacket, imgIndex, className, setImgIndex}) => {
  return ( 
    <>
    {jacket.images.map((img, i) => (
      <img 
        tabIndex="0" 
        className={className}
        style={{border: i === imgIndex ? '3px solid black' : null}}
        key={img.small} 
        src={img.small} 
        alt={`${jacket.title} preview ${i + 1}`} 
        onClick={() => {
          setImgIndex(i);
        }}
      />
    ))}
    </>
  );
}
 
export default ProductThumbsList;