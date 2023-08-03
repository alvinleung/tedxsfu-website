import React, { useState } from "react";
import { motion } from "framer-motion";
import ProfilePicture from "../ProfilePicture";

type Props = {
  children: React.ReactNode;
  name: string;
};

const TeamView = (props: Props) => {
  return (
    <div className="mb-8">
      <h4 className="text-micro text-[rgba(0,0,0,.5)] uppercase tracking-wider pb-1 mb-2 border-b">
        {props.name}
      </h4>
      <div className="grid grid-cols-2 gap-x-4">{props.children}</div>
    </div>
  );
};

const TeamMember = ({ name, image, position, linkedin }: {image:string, name: string; position: string; linkedin: string; }) => {
  const [isHovering,setIsHovering] = useState(false);

    return <>
      <div className="leading-snug" onMouseEnter={()=> setIsHovering(true)} onMouseLeave={()=> setIsHovering(false)}>
        <motion.a href={linkedin} target="_blank">{name}</motion.a>
      </div>
      <div className="leading-snug opacity-40">{position}</div>
      <ProfilePicture src={image} isShowing={isHovering}/>
    </>
};

export { TeamView, TeamMember };
