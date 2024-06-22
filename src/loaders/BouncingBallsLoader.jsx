import '../styles/loaders.css';

const BouncingBallsLoader = () => {
  return ( 
    <div className="bouncer" role="alert" aria-busy="true" aria-live="polite" aria-label="Loading...">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
   );
}
 
export default BouncingBallsLoader;