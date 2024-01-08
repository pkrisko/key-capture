import React, { useState, useEffect } from 'react';

const FadeTransition = ({ children, triggerKey }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Fade out first
    setIsVisible(false);

    const timeoutId = setTimeout(() => {
      // Update the children after it fades out
      setDisplayChildren(children);

      // Fade in the new children
      setIsVisible(true);
    }, 200); // 300ms matches the transition duration

    return () => clearTimeout(timeoutId);
  }, [triggerKey, children]); // triggerKey is used to determine when to run the effect

  return (
    <div className={`transition-opacity duration-200 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {displayChildren}
    </div>
  );
};

export default FadeTransition;
