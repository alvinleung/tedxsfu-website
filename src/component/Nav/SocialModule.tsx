import { motion } from "framer-motion";
import React from "react";

import iconFacebook from "../../../public/img/ic_baseline-facebook.svg";
import iconInstagram from "../../../public/img/mdi_instagram.svg";
import iconLinkedin from "../../../public/img/mdi_linkedin.svg";
import iconTwitter from "../../../public/img/mdi_twitter.svg";

import Image from "next/image";

type Props = {};

const SocialModule = (props: Props) => {
  return (
    <motion.div className="mt-4 flex flex-row gap-2">
      
      <motion.a
        href="https://instagram.com/tedxsfu"
        target="_blank"
        whileHover={{ scale: 1.1 }}
      >
        <Image
          src={iconInstagram}
          alt="Instagram"
          className={true ? "" : "invert"}
        />
      </motion.a>
      <motion.a
        href="https://twitter.com/tedxsfu"
        target="_blank"
        whileHover={{ scale: 1.1 }}
      >
        <Image
          src={iconTwitter}
          alt="Twitter"
          className={true ? "" : "invert"}
        />
      </motion.a>
      <motion.a
        href="https://linkedin.com/company/tedxsfu"
        target="_blank"
        whileHover={{ scale: 1.1 }}
      >
        <Image
          src={iconLinkedin}
          alt="LinkedIn"
          className={true ? "" : "invert"}
        />
      </motion.a>
      <motion.a
        href="https://www.facebook.com/profile.php?id=100094774132695"
        target="_blank"
        whileHover={{ scale: 1.1 }}
      >
        <Image
          src={iconFacebook}
          alt="Facebook"
          className={true ? "" : "invert"}
        />
      </motion.a>
    </motion.div>
  );
};

export default SocialModule;
