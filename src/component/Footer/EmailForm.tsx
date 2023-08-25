import { motion } from "framer-motion";
import React from "react";

type Props = {
  isDarkMode: boolean;
};

const EmailForm = ({ isDarkMode }: Props) => {
  const darkModeColor = "rgba(255,255,255,.3)";
  const lightModeColor = "rgba(0,0,0,.8)";

  return (
    <div>
      <div className="mb-2 text-micro opacity-50">Email*</div>
      <div
        className={`relative flex flex-col items-end justify-center rounded-full border border-[${
          isDarkMode ? darkModeColor : lightModeColor
        }]`}
      >
        <input
          type="text"
          className="w-full rounded-full border-none bg-transparent py-2 pl-4 pr-12"
          placeholder="my-email@gmail.com"
        />
        <motion.button
          className={`absolute mr-1 rounded-full ${
            isDarkMode ? "bg-white text-black" : "bg-black text-white"
          } px-4 py-2 text-micro uppercase`}
        >
          Join
        </motion.button>
      </div>
    </div>
  );
};

export default EmailForm;
