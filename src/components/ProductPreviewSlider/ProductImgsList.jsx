const ProductImgsList = ({jacket, imgIndex}) => {
  return ( 
    <>
      {jacket.images.map((img, i) => (
        <img 
          className="product-image" 
          aria-hidden={imgIndex !== i} 
          style={{translate: `${-100 * imgIndex}%`}} 
          key={img.regular} 
          src={img.regular} 
          alt={`${jacket.title} ${i + 1}`} 
        />
      ))}
  </>
  );
}
 
export default ProductImgsList;