import { motion } from "framer-motion";
import  { useFormFields, useMailChimpForm } from "use-mailchimp-form";
import React from "react";
import LoadingIcon from "./LoadingIcon";

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
    <div>
      <div className="mb-2 text-micro opacity-50">Your email address*</div>
      <form
        className={`relative flex flex-col items-end justify-center rounded-full `}
        onSubmit={event => {
          event.preventDefault();
          handleSubmit(fields);
        }}
        noValidate
      >
        
        <input
          type="email"
          className={`peer w-full rounded-full !text-body !bg-transparent py-3 pl-4 pr-12 border border-[${
            isDarkMode ? darkModeColor : lightModeColor
          }]`}
          placeholder="your-name@email.com"
          id="EMAIL"
          autoFocus
          value={fields.EMAIL}
          onChange={handleFieldChange}
          pattern="^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$"
        />
        <motion.button
          className={`
          peer-placeholder-shown:text-red-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:cursor-not-allowed
          peer-invalid:text-red-500 peer-invalid:opacity-50 peer-invalid:cursor-not-allowed mr-1.5 absolute rounded-full h-8 ${
            isDarkMode ? "bg-white text-black" : "bg-black text-white"
          } px-4 py-2 text-micro uppercase`}
        >
          { !loading && !success && !error && <>Join</>}
          {loading && <LoadingIcon/>}
          {error && <>Not nice</>}
          {success && <>Nice</>}
          {/* <LoadingIcon/> */}
        </motion.button>
      </form>
    </div>
  );
};

export default EmailForm;
