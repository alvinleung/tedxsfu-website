import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useFormFields, useMailChimpForm } from "use-mailchimp-form";
import React, { useState, useEffect, useMemo } from "react";
import LoadingIcon from "./LoadingIcon";
import isEmail from "validator/lib/isEmail";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  isDarkMode: boolean;
  secondary?: boolean;
};

const EmailForm = ({ isDarkMode, secondary }: Props) => {
  // const url = "fdsa";
  const url =
    "https://tedxsfu.us7.list-manage.com/subscribe/post?u=92f4f790178ff00e2b0e57b7f&amp;id=2f9caf4ffb&amp;f_id=00a9d2e4f0";
  const { loading, error, success, message, handleSubmit } =
    useMailChimpForm(url);
  const { fields, handleFieldChange } = useFormFields({
    EMAIL: "",
  });

  const errorAnim = useAnimationControls();

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const canSubmit = useMemo(() => isEmail(fields.EMAIL), [fields]);
  const isEmpty = useMemo(() => fields.EMAIL === "", [fields]);

  const errorMessage = useMemo(() => {
    // mailchimp error
    if (error) {
      return message;
    }
    // format error
    if (!isEmail(fields.EMAIL) && hasSubmitted) {
      return "Please enter a valid email to subscribe.";
    }

    return "";
  }, [message, error, hasSubmitted, fields.EMAIL]);
  const hasError = errorMessage !== "";

  const onFormSubmit = () => {
    setHasSubmitted(true);
    if (canSubmit) {
      handleSubmit(fields);
      return;
    }
    errorAnim.start({
      x: [5, -5, 5, 0],
      transition: { duration: 0.3 },
    });
  };

  const darkModeColor = "rgba(255,255,255,.15)";
  const lightModeColor = "rgba(0,0,0,.2)";
  const darkModeColorFocused = "rgba(255,255,255,.3)";
  const lightModeColorFocused = "rgba(0,0,0,.4)";

  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.form
      className={`text-micro backdrop-blur-sm ${
        isDarkMode ? "bg-neutral-900/25 text-white/50" : "text-black/50"
      } overflow-hidden rounded-lg
      border px-3 pb-2 pt-3`}
      animate={{
        borderColor: isDarkMode
          ? isFocused
            ? darkModeColorFocused
            : darkModeColor
          : isFocused
          ? lightModeColorFocused
          : lightModeColor,
        paddingBottom: success ? "1rem" : "0.5rem",
      }}
      transition={{
        duration: AnimationConfig.NORMAL,
        ease: AnimationConfig.EASING,
      }}
      onSubmit={(event) => {
        event.preventDefault();
        onFormSubmit();
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
            transition={{
              duration: AnimationConfig.NORMAL,
              ease: "linear",
            }}
          >
            Your email address*
            <div className="mt-1 flex flex-row gap-x-4">
              <motion.input
                animate={errorAnim}
                type="email"
                className={`peer w-full !border-none !bg-transparent py-2 !text-body ${
                  isDarkMode
                    ? "text-white placeholder:text-[#FFFFFF4F]"
                    : "text-black placeholder:text-[#0000004F]"
                }`}
                placeholder="your-name@email.com"
                id="EMAIL"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                // autoFocus
                value={fields.EMAIL}
                disabled={success}
                onChange={handleFieldChange}
                pattern="^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$"
              />
              {!success && (
                <motion.button
                  transition={{
                    duration: AnimationConfig.NORMAL,
                    ease: AnimationConfig.EASING,
                  }}
                  className={`
            h-8
            rounded-[4px] px-4 py-2 
            text-micro uppercase`}
                  disabled={secondary && isEmpty}
                  animate={
                    secondary && {
                      color: isDarkMode
                        ? !isEmpty
                          ? "#000"
                          : "#999"
                        : !isEmpty
                        ? "#FFF"
                        : "#888",
                      background: isDarkMode
                        ? !isEmpty
                          ? "#fff"
                          : "#222"
                        : !isEmpty
                        ? "#000"
                        : "#DDD",
                    }
                  }
                  style={{
                    color: isDarkMode ? "#000" : "#FFF",
                    background: isDarkMode ? "#fff" : "#000",
                  }}
                >
                  {!loading && !success && <>Join</>}
                  {loading && (
                    <div className={isDarkMode ? "invert" : ""}>
                      <LoadingIcon />
                    </div>
                  )}
                  {/* <LoadingIcon/> */}
                </motion.button>
              )}
            </div>
          </motion.label>
        )}
        {hasError && (
          <motion.p
            className="mt-2 pt-2 text-micro-mobile"
            style={{
              color: isDarkMode ? "#FFF" : "#000",
              borderTop: isDarkMode
                ? "1px solid rgba(255,255,255,.2)"
                : "1px solid rgba(0,0,0,.2)",
            }}
          >
            {errorMessage}
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
            transition={{
              duration: AnimationConfig.SLOW,
              delay: 0.3,
              ease: "linear",
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
