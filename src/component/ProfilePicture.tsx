import React, { useEffect } from 'react'
import {useState} from 'react';
import { useMousePosition } from "@/hooks/useMousePosition";
import { easeIn, motion } from 'framer-motion';
import Fixed from './ScrollContainer/Fixed';

type Props = {
    src: string;
    isShowing:boolean;
};


const ProfilePicture = ({src, isShowing}:Props) => {

  const mousePos = useMousePosition();

    useEffect(()=>{
        if(isShowing) console.log("show")
    },[isShowing])

  return (
    <Fixed top={"0px"} left={"0px"} pointerEvents="none">
        {isShowing && <motion.div 
        initial={ {
            x: mousePos.x+40,
            y: mousePos.y,}}
        animate={{
            position:"absolute",
            x: mousePos.x,
            y: mousePos.y,
            zIndex:1000,
            
        }}
        style={{
          height: 200,
          width: 200
        }}>
            <img src={src} />
        </motion.div>
        }
    </Fixed>
  )
}

export default ProfilePicture