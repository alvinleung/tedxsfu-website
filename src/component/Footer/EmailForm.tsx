import { motion, AnimatePresence } from "framer-motion";
import  { useFormFields, useMailChimpForm } from "use-mailchimp-form";
import React, { useState, useEffect } from "react";
import LoadingIcon from "./LoadingIcon";
import isEmail from 'validator/lib/isEmail';

type Props = {
  isDarkMode: boolean;
};

const EmailForm = ({ isDarkMode }: Props) => {
  const url = "https://tedxsfu.us7.list-manage.com/subscribe/post?u=92f4f790178ff00e2b0e57b7f&amp;id=2f9caf4ffb&amp;f_id=00a9d2e4f0";
  const {
      loading,
      error,
      success,
      message,
      handleSubmit
    } = useMailChimpForm(url);
  const { fields, handleFieldChange } = useFormFields({
  EMAIL: ""
  });


  const darkModeColor = "rgba(255,255,255,.3)";
  const lightModeColor = "rgba(0,0,0,.8)";

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleSubmit(fields);
      }}
      noValidate>
      <motion.label
        className={`relative flex flex-col justify-center rounded-lg 
        text-micro text-white/50
        pt-4 pb-2 px-2 border`}
        animate={{
          borderColor: isDarkMode ? darkModeColor : lightModeColor
        }}
      >
       Your email address*
        <div className="flex flex-row gap-x-4">
          <input
            type="email"
            className={`py-2 peer w-full text-white !text-body !bg-transparent !border-none ${success && "text-center"}`}
            placeholder="your-name@email.com"
            id="EMAIL"
            // autoFocus
            value={success ? "Thanks for subscribing!" : fields.EMAIL}
            disabled={success}
            onChange={handleFieldChange}
            pattern="^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$"
          />
          {!success &&
          
          <motion.button
            className={`
            peer-placeholder-shown:cursor-not-allowed
            peer-invalid:cursor-not-allowed rounded-sm h-8 ${
              isDarkMode ? "bg-white text-black" : "bg-black text-white"
            } px-4 py-2 text-micro uppercase`}
            disabled={!isEmail(fields.EMAIL)}
            animate={{
              opacity: isEmail(fields.EMAIL) ? 1 : 0.5
            }}
          >
            <AnimatePresence>
              { !loading && !success && <>Join</>}
              {loading && <LoadingIcon/>}
              {/* <LoadingIcon/> */}
            </AnimatePresence>
          </motion.button>}
        </div>
      </motion.label>
      {error && <p className="text-ted">An error occured&mdash;please try again</p>}
    </form>
  );
};

export default EmailForm;
