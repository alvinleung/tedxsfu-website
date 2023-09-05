import { motion, useAnimation, useAnimate } from "framer-motion"
import React, { useState, useEffect } from "react"
import { AnimationConfig } from "../AnimationConfig";
import { useNavContext } from "./Nav2";

const Hamburger = () => {
    const navContext = useNavContext();
   
    const [open, setOpen] = useState(navContext.isOpened);
    useEffect(() => {
        setOpen(navContext.isOpened)
    }, [navContext.isOpened])

    const pathVariants = {
        a: { d: ["M4 5 L20 5 L20 7 L4 7 L4 5Z", "M4 11 L20 11 L20 13 L4 13 L4 11Z", "M7.0502 5.63605L18.3639 16.9498L16.9497 18.364L5.63599 7.05026L7.0502 5.63605Z"] },
        b: { d: ["M7.0502 5.63605L18.3639 16.9498L16.9497 18.364L5.63599 7.05026L7.0502 5.63605Z", "M4 11 L20 11 L20 13 L4 13 L4 11Z", "M4 5 L20 5 L20 7 L4 7 L4 5Z", ] },
    }

    const pathVariants2 = {
        a: { d: ["M4 17 L20 17 L20 19 L4 19 L4 17Z" ,"M4 11 L20 11 L20 13 L4 13 L4 11Z", "M7.0502 5.63605L18.3639 16.9498L16.9497 18.364L5.63599 7.05026L7.0502 5.63605Z"] },
        b: { d: ["M7.0502 5.63605L18.3639 16.9498L16.9497 18.364L5.63599 7.05026L7.0502 5.63605Z", "M4 11 L20 11 L20 13 L4 13 L4 11Z", "M4 17 L20 17 L20 19 L4 19 L4 17Z" ,] },
        
    }

    const pathVariants3 = {
        a: { d: ["M4 11 L20 11 L20 13 L4 13 L4 11Z", "M4 11 L20 11 L20 13 L4 13 L4 11Z", "M5.63599 16.9498L16.9497 5.63605L18.3639 7.05026L7.0502 18.364L5.63599 16.9498Z"] },
        b: { d: [ "M5.63599 16.9498L16.9497 5.63605L18.3639 7.05026L7.0502 18.364L5.63599 16.9498Z", "M4 11 L20 11 L20 13 L4 13 L4 11Z", "M4 11 L20 11 L20 13 L4 13 L4 11Z",] },
    }


    return(
         <motion.svg fill="white" className="w-6 h-6">
            <motion.path
                variants={pathVariants}
                animate={open ? "a" : "b"}
                transition={{
                    duration: AnimationConfig.FAST,
                    ease: AnimationConfig.EASING_INVERTED
                }}
            /> 
            <motion.path
                variants={pathVariants2}
                animate={open ? "a" : "b"}
                transition={{
                    duration: AnimationConfig.FAST,
                    ease: AnimationConfig.EASING_INVERTED
                }}
            /> 
            <motion.path
               variants={pathVariants3}
               animate={open ? "a" : "b"}
               transition={{
                duration: AnimationConfig.FAST,
                ease: AnimationConfig.EASING_INVERTED
                }}
            /> 
        </motion.svg>
    )
}

export default Hamburger;