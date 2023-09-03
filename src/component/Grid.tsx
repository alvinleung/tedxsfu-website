import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { useWindowDimension } from "../hooks/useWindowDimension";

type Props = {}

const GridOverlay = (props: Props) => {
    const viewport = useWindowDimension();
  
  return (
    <motion.div 
        className="fixed z-50 pointer-events-none top-0 left-4 right-4 bottom-0 grid gap-4 opacity-20 grid-cols-4 md:grid-cols-6 lg:grid-cols-6 2xl:grid-cols-8">
            <div className="h-full bg-ted"></div>
            <div className="h-full bg-ted"></div>
            <div className="h-full bg-ted"></div>
            <div className="h-full bg-ted"></div>
            {viewport.width >= 768 && <div className="h-full bg-ted"></div>}
            {viewport.width >= 768 && <div className="h-full bg-ted"></div>}
            {viewport.width >= 1536 && <div className="h-full bg-ted"></div>}
            {viewport.width >= 1536 && <div className="h-full bg-ted"></div>}
    </motion.div>
  )
}

export default GridOverlay