import { motion } from "framer-motion";
import Link from "next/link";

interface NavButtonProps {
  onClick: () => void;
  onEnterPreview: () => void;
  onExitPreview: () => void;
  isHighlighted: boolean;
  href: string;
  index: string;
  title: string;
  description: string;
}
export const NavButton = ({
  onClick,
  onEnterPreview,
  onExitPreview,
  title,
  index,
  description,
  href,
  isHighlighted,
}: NavButtonProps) => {
  return (
    <Link
      href={href}
      className={`col-span-full min-h-[4rem] md:col-span-3 md:col-start-2 2xl:col-start-2`}
      onClick={() => onClick?.()}
      onMouseEnter={() => onEnterPreview?.()}
      onMouseLeave={() => onExitPreview?.()}
    >
      <motion.div
        animate={{
          opacity: isHighlighted ? 1 : 0.5,
        }}
        style={{
          borderTop: "1px solid rgba(255,255,255,.5)",
        }}
      >
        <motion.div className={`grid grid-cols-4 gap-4 pt-3 md:grid-cols-3`}>
          <span className="pt-[2px] text-body-mobile md:text-body">
            {index}
          </span>
          <div className="col-span-3 text-header-mobile md:col-span-2">
            {title}
            <p className="mt-1 text-micro-mobile">{description}</p>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};
