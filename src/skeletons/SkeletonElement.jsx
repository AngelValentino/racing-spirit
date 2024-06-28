import '../styles/skeleton.css';

const SkeletonElement = ({ type, addClass, width, height }) => {
  function renderType() {
    // If neither type nor addClass are provided, return the base class
    if (!type && !addClass) {
      return 'skeleton-element';
    }  
    // If type is not provided but addClass is, return the base class with additional classes
    else if (!type && addClass) {
      return `skeleton-element ${addClass}`;
    }
    // If type is provided, return the base class with type and additional classes
    else {
      return `skeleton-element skeleton__${type}${addClass ? ` ${addClass}` : ''}`;
    }
  }

  return ( 
    <div style={{ width, height }} className={renderType()} role="alert" aria-busy="true" aria-live="polite" aria-label="Loading..."></div>
  );
}
 
export default SkeletonElement;