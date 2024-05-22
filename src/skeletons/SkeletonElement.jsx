import '../styles/skeleton.css'

const SkeletonElement = ({ type, addClass }) => {
  
  return ( 
    <div className={`skeleton-element skeleton__${type}${addClass ? ` ${addClass}` : ''}`} role="alert" aria-busy="true" aria-live="polite" aria-label="Loading..."></div>
  );
}
 
export default SkeletonElement;