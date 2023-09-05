import { motion, AnimatePresence } from "framer-motion";
import { useFormFields, useMailChimpForm } from "use-mailchimp-form";
import React, { useState, useEffect } from "react";
import LoadingIcon from "./LoadingIcon";
import isEmail from "validator/lib/isEmail";

type Props = {
  isDarkMode: boolean;
};

const EmailForm = ({ isDarkMode }: Props) => {
  const url =
    "https://tedxsfu.us7.list-manage.com/subscribe/post?u=92f4f790178ff00e2b0e57b7f&amp;id=2f9caf4ffb&amp;f_id=00a9d2e4f0";
  const { loading, error, success, message, handleSubmit } =
    useMailChimpForm(url);
  const { fields, handleFieldChange } = useFormFields({
    EMAIL: "",
  });

  const darkModeColor = "rgba(255,255,255,.3)";
  const lightModeColor = "rgba(0,0,0,.8)";

  return (
    <motion.form
      layout
      className={`text-micro backdrop-blur-sm ${
        isDarkMode ? "bg-neutral-900/25 text-white/50" : "text-black/50"
      } overflow-hidden rounded-lg
      border px-2 pb-2 pt-4`}
      animate={{
        borderColor: isDarkMode ? darkModeColor : lightModeColor,
        paddingBottom: success ? "1rem" : "0.5rem",
      }}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(fields);
      }}
      noValidate
    >
      <AnimatePresence mode="wait">
        {!success && (
          <motion.label
            className={`relative flex flex-col justify-center`}
            exit={{
              opacity: 0,
            }}
          >
            Your email address*
            <div className="flex flex-row gap-x-4">
              <input
                type="email"
                className={`peer w-full !border-none !bg-transparent py-2 !text-body ${
                  isDarkMode
                    ? "text-white placeholder:text-[#FFFFFF4F]"
                    : "text-black placeholder:text-[#0000004F]"
                }`}
                placeholder="your-name@email.com"
                id="EMAIL"
                // autoFocus
                value={fields.EMAIL}
                disabled={success}
                onChange={handleFieldChange}
                pattern="^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$"
              />
              {!success && (
                <motion.button
                  className={`
            h-8
            rounded-sm px-4 py-2 
            text-micro uppercase peer-placeholder-shown:cursor-not-allowed peer-invalid:cursor-not-allowed`}
                  disabled={!isEmail(fields.EMAIL)}
                  animate={{
                    color: isEmail(fields.EMAIL) ? "#ffffffFF" : "#ffffff3F",
                    background: isDarkMode
                      ? isEmail(fields.EMAIL)
                        ? "#4F4F4F"
                        : "#303030"
                      : isEmail(fields.EMAIL)
                      ? "#303030"
                      : "#CCCCCC",
                  }}
                  whileHover={{
                    background: isDarkMode
                      ? isEmail(fields.EMAIL)
                        ? "#555"
                        : "#303030"
                      : isEmail(fields.EMAIL)
                      ? "#4F4F4F"
                      : "#CCCCCC",
                  }}
                >
                  {!loading && !success && <>Join</>}
                  {loading && <LoadingIcon />}
                  {/* <LoadingIcon/> */}
                </motion.button>
              )}
            </div>
          </motion.label>
        )}
        {error && (
          <motion.p
            className="text-ted"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            An error occured&mdash;please try again
          </motion.p>
        )}
        {success && (
          <motion.p
            className={`flex h-16 items-center justify-center text-center text-body ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            Thanks for subscribing!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default EmailForm;
