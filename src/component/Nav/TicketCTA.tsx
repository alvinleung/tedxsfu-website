import React from "react";

type Props = {
  isHighlighted: boolean;
};

const TicketCTA = ({ isHighlighted }: Props) => {
  return (
    <a
      href="https://www.ticketmaster.ca/event/11005F2D0FDD4B2A"
      target="_blank"
      className="flex h-[46px] flex-row items-center rounded-md px-[4px] text-body-tablet backdrop-blur-lg"
      style={{
        backgroundColor: isHighlighted ? "#FFF" : "rgba(255,255,255,.05)",
        color: isHighlighted ? "#000" : "#FFF",
        border: isHighlighted ? "1px solid rgba(0,0,0,0)" : "1px solid #383838",
      }}
    >
      <div
        className="pl-[7px] pr-[6px]"
        style={{
          filter: isHighlighted ? "" : "invert(1)",
        }}
      >
        <TicketIcon />
      </div>

      <div
        className="h-[28px]"
        style={{
          borderLeft: isHighlighted ? "1px solid #333" : "1px solid #555555",
        }}
      />
      <div className="flex h-[28px] flex-col items-start whitespace-nowrap pl-[9px] pr-[9px]">
        <div className="mt-[-1px] text-nav uppercase leading-none">
          Get Tickets
        </div>
        <div
          className="mt-[3px] flex flex-col text-nav-s leading-none tracking-wide"
          style={{
            opacity: isHighlighted ? 1 : 0.7,
          }}
        >
          Ticketmaster
        </div>
      </div>
    </a>
  );
};

const TicketIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.64155 12.666L13.541 2.76655C13.9967 2.31094 14.7354 2.31094 15.191 2.76655L20.1407 7.7163C20.5963 8.17191 20.5963 8.91061 20.1407 9.36622L10.2412 19.2657C9.78561 19.7213 9.04691 19.7213 8.5913 19.2657L3.64155 14.316C3.18594 13.8604 3.18594 13.1217 3.64155 12.666ZM2.8166 15.1409C1.90537 14.2297 1.90537 12.7523 2.8166 11.8411L12.7161 1.9416C13.6273 1.03037 15.1047 1.03037 16.0159 1.9416L20.9657 6.89134C21.8769 7.80257 21.8769 9.27995 20.9657 10.1912L11.0662 20.0907C10.155 21.0019 8.67757 21.0019 7.76634 20.0907L6.69063 19.0149L6.39748 20.1089C6.23072 20.7313 6.60006 21.371 7.22244 21.5378L20.7454 25.1613C21.3678 25.328 22.0075 24.9587 22.1743 24.3363L23.986 17.5748C24.1528 16.9525 23.7834 16.3127 23.161 16.146L16.7333 14.4236L17.6858 13.4711L23.463 15.0191C24.7078 15.3526 25.4464 16.632 25.1129 17.8768L23.3012 24.6383C22.9677 25.883 21.6882 26.6217 20.4434 26.2882L6.92049 22.6647C5.67573 22.3312 4.93704 21.0517 5.27057 19.807L5.73805 18.0623L2.8166 15.1409Z"
      fill="black"
    />
  </svg>
);

export default TicketCTA;
