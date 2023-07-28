import React from "react"
import { createContext, useContext, useEffect, useState } from 'react';

const MousePositionContext = createContext({ x: 0, y: 0});
MousePositionContext.displayName = 'MousePositionContext';

type MousePositionProps = {
    children:React.ReactNode;
}

export const MousePosContextProvider:React.FC<MousePositionProps> = ({children}) => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (e : MouseEvent) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        }
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return(
        <MousePositionContext.Provider value={position}>
            {children}
        </MousePositionContext.Provider>
    )
}

export const useMousePosition = () => useContext(MousePositionContext);