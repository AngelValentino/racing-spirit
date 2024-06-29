const ProductThumbsList = ({ jacket, imgIndex, className, setImgIndex }) => {
  return ( 
    <>
      {jacket.images.map((img, i) => (
        <li role="presentation" key={img.small}>
            <img 
              role="tab"
              aria-controls={`product-preview-slider__item-${i + 1}`}
              aria-selected={i === imgIndex}
              aria-label={`Show image ${i + 1}.`}
              tabIndex="0" 
              className={className}
              style={{ border: i === imgIndex ? '2px solid #000' : null }}
              src={img.small} 
              alt={`${jacket.title} preview ${i + 1}`} 
              onClick={() => {
                setImgIndex(i);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') setImgIndex(i);
              }}
            />
        </li>
      ))}
    </>
  );
}
 
export default ProductThumbsList;