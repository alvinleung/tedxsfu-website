import { useMousePosition } from '@/hooks/useMousePosition';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const Cursor = (props: Props) => {

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [isHidden, setIsHidden] = useState(true);
  const isUsingTouch = useRef(false);
  const [mousedown, setMouseDown] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isUsingTouch.current) setIsHidden(false);
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseEnter = (e: MouseEvent) => {
    showCursorForMouseInput();
    setIsHidden(false);
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const showCursorForMouseInput = () => {
    addAllMouseEventListeners();
    setIsHidden(false);
    isUsingTouch.current = false;
  };

  const hideCursorForTouchScreen = () => {
    removeAllMouseEventListeners();
    isUsingTouch.current = true;
    setIsHidden(true);
  };


  const handleMouseLeave = () => {
    setIsHidden(true);
  };

  const handleMouseDown = () => {
    setMouseDown(true);
  };
  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const addAllMouseEventListeners = () => {
    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mousedown', handleMouseDown);
    document.body.addEventListener('mouseup', handleMouseUp);
  };

  const removeAllMouseEventListeners = () => {
    document.body.removeEventListener('mousemove', handleMouseMove);
    document.body.removeEventListener('mouseenter', handleMouseEnter);
    document.body.removeEventListener('mouseleave', handleMouseLeave);
    document.body.removeEventListener('mousedown', handleMouseDown);
    document.body.removeEventListener('mouseup', handleMouseUp);
  };
  useEffect(() => {
  addAllMouseEventListeners();
  // for canceling touch
  document.body.addEventListener('touchend', hideCursorForTouchScreen);
  document.body.addEventListener('touchstart', hideCursorForTouchScreen);

  return () => {
    removeAllMouseEventListeners();
    // for canceling touch
    document.body.removeEventListener('touchend', hideCursorForTouchScreen);
    document.body.removeEventListener('touchstart', hideCursorForTouchScreen);
  };
}, []);

useEffect(() => {
    addAllMouseEventListeners();
    // for canceling touch
    document.body.addEventListener('touchend', hideCursorForTouchScreen);
    document.body.addEventListener('touchstart', hideCursorForTouchScreen);

    return () => {
      removeAllMouseEventListeners();
      // for canceling touch
      document.body.removeEventListener('touchend', hideCursorForTouchScreen);
      document.body.removeEventListener('touchstart', hideCursorForTouchScreen);
    };
  }, []);

  useEffect(() => {
    const allAnchorElements = document.querySelectorAll('a, button');

    const handleLinkMouseOver = (e: MouseEvent) => {

      // only use the hover effect links
      // if (
      //   !(e.target instanceof HTMLAnchorElement) &&
      //   !(e.target instanceof HTMLButtonElement)
      // )
      //   return;
        
      setIsHovering(true);
    };
    const handleLinkMouseOut = (e: MouseEvent) => {
      setIsHovering(false);
    };

    allAnchorElements.forEach((el) => {
      (el as HTMLAnchorElement).addEventListener('mouseover', handleLinkMouseOver);
      (el as HTMLAnchorElement).addEventListener('mouseout', handleLinkMouseOut);
    });
    return () => {
      allAnchorElements.forEach((el) => {
        (el as HTMLAnchorElement).removeEventListener('mouseover', handleLinkMouseOver);
        (el as HTMLAnchorElement).removeEventListener('mouseout', handleLinkMouseOut);
      });
    };
  }, []);
  
  return (
    <motion.div 
        className="fixed pointer-events-none" 
        style={{
          transformOrigin: "50% 50%",
          x: mousePos.x, 
          y: mousePos.y,
          zIndex: 10000000000
        }}
        animate={{
          opacity: isHidden? 0 : isHovering? .2 : .2,
          scale: isHidden? 0 : isHovering? 2:1,
          transition: {
              duration: .3,
              ease: [0.16, 1, 0.3, 1]
            }
        }}
        >
      <motion.div 
        className="w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
            // background: isHovering ? "#EB0028" : "#FFFFFF",
            background: isHovering ? "#FFF" : "#FFFFFF",
            transition: {
              duration: .3,
              ease: [0.16, 1, 0.3, 1]
            }
        }}
      />
    </motion.div>
  )
}

export default Cursor