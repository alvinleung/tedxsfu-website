import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavButtonProps {
  onEnterPreview: () => void;
  onExitPreview: () => void;
  isHighlighted: boolean;
  href: string;
  index: string;
  title: string;
  description: string;
}
export const NavButton = ({
  onEnterPreview,
  onExitPreview,
  title,
  index,
  description,
  href,
  isHighlighted,
}: NavButtonProps) => {
  const router = useRouter();
  const handleLinkClick = () => {
    if (router.pathname !== href) router.push(href);
  };

  return (
    <a
      onClick={handleLinkClick}
      className="block h-[7rem] cursor-pointer"
      onMouseEnter={() => onEnterPreview?.()}
      onMouseLeave={() => onExitPreview?.()}
    >
      <motion.div
        animate={{
          opacity: isHighlighted ? 1 : 0.4,
        }}
        style={{
          borderTop: "1px solid rgba(255,255,255,.3)",
        }}
        whileTap={{
          scale: 0.98,
        }}
      >
        <motion.div className={`grid grid-cols-4 gap-4 pt-3 md:grid-cols-3`}>
          <span className="pt-[2px] text-body-mobile md:text-body">
            {index}
          </span>
          <div className="col-span-3 text-header-mobile md:col-span-2">
            {title}
            <p className="mt-1 text-body">{description}</p>
          </div>
        </motion.div>
      </motion.div>
    </a>
  );
};
