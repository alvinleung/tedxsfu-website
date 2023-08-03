import React from "react";
import Image from "next/image";

type Props = {
  src: string;
};

const ImageSlide = ({ src }: Props) => {
  return (
    <Image
      src={src}
      className="max-h-[87vh] object-cover"
      width={1920}
      height={1080}
      alt="Picture of the author"
    />
  );
};

export default ImageSlide;
