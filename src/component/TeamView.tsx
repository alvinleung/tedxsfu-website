import React from "react";

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

const TeamMember = ({ name, position }: { name: string; position: string }) => (
  <>
    <div className="leading-snug">{name}</div>
    <div className="leading-snug opacity-40">{position}</div>
  </>
);

export { TeamView, TeamMember };
