import { useState } from 'react';

const useSwipe = (onSwipeLeft, onSwipeRight, minSwipeDistance = 25) => {
  const [ touchStartX, setTouchStartX ] = useState(null);
  const [ touchStartY, setTouchStartY ] = useState(null);
  const [ touchEndX, setTouchEndX ] = useState(null);
  const [ touchEndY, setTouchEndY ] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return;

    const distanceX = touchStartX - touchEndX;
    const distanceY = touchStartY - touchEndY;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    /* The condition Math.abs(distanceX) > Math.abs(distanceY) ensures 
    that the horizontal movement is greater than the vertical movement, 
    meaning the swipe is predominantly horizontal. */
    if (isRightSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      onSwipeRight();
    }

    if (isLeftSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      onSwipeLeft();
    }

    // Reset touch positions
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
    setTouchEndY(null);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useSwipe;