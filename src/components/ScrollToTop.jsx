import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Component to scroll to the top of the page when the route changes
export default function ScrollToTop() {
  const { pathname } = useLocation();
  
  // Scroll to the top of the page whenever the pathname changes
  useEffect(() => {
    // Check if the browser supports controlling scroll restoration
    const canControlScrollRestoration = 'scrollRestoration' in window.history;
    // If supported, set scroll restoration mode to manual to prevent browser's default behavior
    if (canControlScrollRestoration) window.history.scrollRestoration = 'manual';
    // Scroll to the top of the page
    /* Clicking on recommended products in the details section causes the page 
    to scroll to the top faster than the new product can ever render, resulting in subtle flickering. 
    Ultimately, this may require replacing all loaders. */
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}