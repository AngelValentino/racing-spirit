const ProductImgsList = ({jacket, imgIndex}) => {
  return ( 
    <>
      {jacket.images.map((img, i) => (
        <img 
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${jacket.images.length}`}
          role="tabpanel"
          id={`product-preview-slider__item-${i + 1}`}
          className="product-image" 
          aria-hidden={imgIndex !== i} 
          style={{ translate: `${-100 * imgIndex}%` }} 
          key={img.regular} 
          src={img.regular} 
          alt={`${jacket.title} ${i + 1}`} 
        />
      ))}
  </>
  );
}
 
export default ProductImgsList;