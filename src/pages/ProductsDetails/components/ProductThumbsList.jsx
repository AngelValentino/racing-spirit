const ProductThumbsList = ({jacket, imgIndex, className, setImgIndex}) => {
  return ( 
    <>
    {jacket.images.map((img, i) => (
      <li>
          <img 
            tabIndex="0" 
            className={className}
            style={{border: i === imgIndex ? '2px solid #000' : null}}
            key={img.small} 
            src={img.small} 
            alt={`${jacket.title} preview ${i + 1}`} 
            onClick={() => {
              setImgIndex(i);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setImgIndex(i);
              }
            }}
          />
      </li>
    ))}
    </>
  );
}
 
export default ProductThumbsList;