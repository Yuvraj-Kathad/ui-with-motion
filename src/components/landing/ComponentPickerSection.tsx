import React from "react";
import Image from "next/image";

const STEPS = [
  {
    id: "find-your-component",
    image: "/images/feature-steps/step1-find.png",
    imageStyle: {
      position: "absolute" as const,
      width: "107.92%",
      height: "109.33%",
      left: "-3.96%",
      top: "-0.06%",
      objectFit: "cover" as const,
    },
    containerStyle: {
      position: "absolute" as const,
      width: "379px",
      height: "228px",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    title: "Find Your Component",
    description: "Browse the library and discover the right component for your project.",
  },
  {
    id: "make-it-yours",
    image: "/images/feature-steps/step2-customize.png",
    imageStyle: {
      objectFit: "cover" as const,
      width: "100%",
      height: "100%",
    },
    containerStyle: {
      position: "absolute" as const,
      left: "19px",
      top: "43px",
      width: "389px",
      height: "207px",
    },
    title: "Make It Yours",
    description: "Customize the component to fit your style and needs.",
  },
  {
    id: "build-with-it",
    image: "/images/feature-steps/step3-build.png",
    imageStyle: {
      position: "absolute" as const,
      width: "100%",
      height: "118.16%",
      left: "0",
      top: "-0.23%",
      objectFit: "cover" as const,
    },
    containerStyle: {
      position: "absolute" as const,
      left: "61px",
      top: "24px",
      width: "293px",
      height: "243px",
    },
    title: "Build With It",
    description: "Take the component into your project and make it work for you.",
  },
];

export function ComponentPickerSection() {
  return (
    <section
      id="component-picker"
      className="w-full bg-white py-[80px] px-[70px] flex flex-col items-center gap-[80px]"
    >
      {/* Section Heading */}
      <h2 className="font-title font-bold text-[61px] leading-[1.2] text-black whitespace-nowrap text-center">
        Pick a component. Make it yours.
      </h2>

      {/* 3-Step Cards Row */}
      <div className="w-full max-w-[1300px] flex gap-[23px] items-start">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className="flex flex-col gap-[23px] items-start flex-1 min-w-0"
          >
            {/* Preview Frame */}
            <div className="bg-[#FBFCFD] border border-[#B7BABD] rounded-[48px] h-[294px] w-full overflow-hidden relative">
              <div style={step.containerStyle} className="overflow-hidden pointer-events-none">
                <img
                  src={step.image}
                  alt={step.title}
                  style={step.imageStyle}
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-[12px] items-start w-[380px] max-w-full">
              <h3 className="font-sans font-bold text-[20px] leading-[1.2] text-black">
                {step.title}
              </h3>
              <p className="font-sans font-medium text-[16px] leading-[1.2] text-[#7D7F82]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
