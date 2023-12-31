import { motion } from "framer-motion";

export const TEDxSFULogo = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.a
      key="logo"
      aria-label="TEDxSFU"
      href={"/"}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <motion.svg
        key="TEDx"
        // width={501}
        // height={151}
        className="fixed left-0 top-0 z-[60] mt-grid-margin-y block h-logo-height max-w-fit pl-grid-margin-x"
        viewBox="0 0 501 151"
      >
        <motion.path
          fill="#EB0028"
          d="M40.8 39.6522H0V2.20264h126.6V39.6522H85.7V148.396H40.8V39.6522Zm92.7-37.44956h122.9V39.6522h-78v18.2242h78v34.8461h-78v18.2245h78v37.449H133.5V2.20264Zm130.5 
                  0h73.7c48.6 0 65.8 36.04776 65.8 72.89656 0 44.8598-23.7 73.2968-74.5 73.2968h-65V2.20264ZM308.9 110.847h17.6c28 0 32.1-22.7306 
                  32.1-36.4487 0-9.2122-2.9-34.7461-35.3-34.7461H309v71.1948h-.1ZM468 92.322l-13.7-22.8302-13.4 22.8302H408l31.2-46.061-30.1-44.05836H442l12.2 21.82896 
                  12.5-21.82896h32.9L469.5 46.261l31.2 46.061H468Z"
        />
      </motion.svg>
      <motion.svg
        key="SFU"
        // width={375}
        // height={151}
        viewBox="0 0 375 151"
        className="fixed left-[5.1rem] top-0 z-[60] mt-grid-margin-y h-logo-height max-w-fit pl-grid-margin-x ml-1 mix-blend-exclusion"
      >
        <motion.path
          fill="#FFFFFF"
          d="M116.299 38.4947c-.8-8.057-4.4-14.5226-10.8-19.2971-6.3998-4.7745-14.3998-7.1618-23.9998-7.1618-6.8 0-12.8 1.1936-17.9 3.4814-5.2 2.2878-9.2 
                  5.5703-12.1 9.6486-2.9 4.0782-4.4 8.7533-4.4 13.9257 0 3.8793.8 7.1618 2.5 10.0464s3.9 5.3714 6.7 7.4602c2.8 2.0889 6 3.7799 9.4 5.2719 3.4 1.4921 
                  6.9 2.6857 10.5 3.6804l15.4 4.3767c4.7 1.2931 9.2998 2.8846 13.9998 4.874 4.7 1.9894 8.9 4.4761 12.8 7.4602 3.9 2.9841 7 6.6644 9.3 11.0411 2.4 4.3766 
                  3.5 9.5486 3.5 15.6166 0 7.759-2 14.722-6.1 20.889s-9.8 11.14-17.4 14.721c-7.6 3.581-16.5998 
                  5.471-27.1998 5.471-9.9 0-18.6-1.691-25.9-4.973-7.3-3.283-13.1-7.859-17.3-13.628-4.2-5.769-6.5-12.533-7.1-20.192h13.8c.5 5.769 2.4 10.544 5.7 14.522 3.3 3.979 
                  7.7 6.963 13 9.052 5.3 2.089 11.3 3.084 17.8 3.084 7.3 0 13.8-1.194 19.4-3.681 5.6998-2.387 10.1998-5.868 13.3998-10.245 3.3-4.377 4.9-9.45 4.9-15.318 
                  0-4.874-1.3-9.052-3.9-12.434-2.6-3.382-6.1-6.1671-10.7-8.4549-4.5998-2.2878-9.8998-4.2772-15.8998-6.0676l-17.5-5.073c-11.5-3.3819-20.4-8.1565-26.7-14.1247-6.3-5.9681-9.5-13.6273-9.5-22.9774 0-7.7586 
                  2.1-14.7215 6.3-20.5902 4.2-5.9682 9.9-10.54376 17.1-13.92572C64.5992 1.59151 72.6992 0 81.6992 0c9.1 0 17.1 1.69098 24.0998 4.97348 7 3.28249 12.5 7.85812 16.7 13.62732 4.1 5.7692 6.3 12.4337 6.6 
                  19.7944h-12.8v.0995ZM157.1 147.513V2.08887h84.5V14.0252h-71.2v54.7082H235v11.9364h-64.6v66.7442h-13.3v.099ZM361.5 2.08872h13.3V98.3752c0 9.8478-2.3 18.6998-7 26.4588s-11.1 13.926-19.4 18.402c-8.3 4.476-17.9 
                  6.664-28.9 6.664-10.9 0-20.6-2.287-28.9-6.764-8.3-4.476-14.8-10.643-19.5-18.401-4.7-7.759-7-16.612-7-26.4593V1.98926h13.3V97.281c0 7.759 1.7 14.622 5.2 20.59 3.5 6.068 8.4 10.743 14.7 14.224 6.3 3.482 13.7 
                  5.173 22.2 5.173s15.9-1.691 22.2-5.173c6.3-3.481 11.2-8.156 14.7-14.224 3.4-6.067 5.2-12.931 5.2-20.59l-.1-95.19228Z"
        />
      </motion.svg>
    </motion.a>
  );
};
