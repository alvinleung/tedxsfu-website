import React from "react";

type Props = {};

const TypeographyTest = (props: Props) => {
  return (
    <div className="grid grid-cols-4 gap-3 lg:gap-4 lg:grid-cols-6 2xl:grid-cols-8 mb-auto mx-4 my-4">
      <h1 className="text-header-mobile sm:text-header col-start-1 col-span-4 lg:col-start-2 lg:col-span-2 mb-6">
        It’s about ideas worth spreading. It’s about ideas worth spreading
      </h1>
      <p className="text-lead-mobile sm:text-lead col-start-1 col-span-4 lg:col-start-2 lg:col-span-2 mb-6">
        It’s about ideas worth spreading TED stands for Technology,
        Entertainment and Design, known worldwide for their TED and TEDx Talks
        we watch online. The X in TEDx stands for an independent organization,
        marking TEDxSFU as an initiative driven by passionate people from SFU.
      </p>
      <p className="text-body-mobile sm:text-lead col-start-1 col-span-4 lg:col-start-2 lg:col-span-2 mb-6">
        TED stands for Technology, Entertainment and Design, known worldwide for
        their TED and TEDx Talks we watch online. The X in TEDx stands for an
        independent organization, marking TEDxSFU as an initiative driven by
        passionate people from SFU.
      </p>
      <p className="text-micro-mobile sm:text-micro col-start-1 col-span-4 lg:col-start-2 lg:col-span-2 mb-6">
        TED stands for Technology, Entertainment and Design, known worldwide for
        their TED and TEDx Talks we watch online. The X in TEDx stands for an
        independent organization, marking TEDxSFU as an initiative driven by
        passionate people from SFU.
      </p>
    </div>
  );
};

export default TypeographyTest;
