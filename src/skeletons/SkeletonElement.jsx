import '../styles/skeleton.css'

const SkeletonElement = ({ type, addClass, width, height }) => {
  function renderType() {
    if (!type && !addClass) {
      return 'skeleton-element';
    }  
    else if (!type && addClass) {
      return `skeleton-element ${addClass ? `${addClass}` : ''}`;
    }
    else {
      return `skeleton-element skeleton__${type}${addClass ? ` ${addClass}` : ''}`;
    }
  }
  
  const styles = {
    width: width,
    height: height
  }

  return ( 
    <div style={styles} className={renderType()} role="alert" aria-busy="true" aria-live="polite" aria-label="Loading..."></div>
  );
}
 
export default SkeletonElement;