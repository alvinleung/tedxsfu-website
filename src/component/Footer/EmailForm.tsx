import { motion } from "framer-motion";
import React from "react";

type Props = {};

const EmailForm = (props: Props) => {
  return (
    <div>
      <div className="mb-2 text-micro">Email*</div>
      <div className="relative flex flex-col items-end justify-center rounded-full border border-[rgba(255,255,255,.3)] focus-within:border-white">
        <input
          type="text"
          className="w-full rounded-full border-none bg-transparent py-2 pl-4 pr-12"
          placeholder="my-email@gmail.com"
        />
        <motion.button className="absolute mr-1 rounded-full bg-white px-4 py-2 text-micro uppercase text-black">
          Join
        </motion.button>
      </div>
    </div>
  );
};

export default EmailForm;
