import React from "react";

export const ProjectCredit = ({ text }) => {
  return <div className="text-center text-xl pt-2">{text}</div>;
};

export const LeftNote = ({ text }) => {
  return <div className="text-md pt-2">{text}</div>;
};

export const MidNote = ({ text }) => {
  return <div className="text-lg w-full text-center p-2 font-semibold ">{text}</div>;
};

export const ProjectName = ({ text }) => {
  return (
    <div className="text-4xl pt-32 md:pt-14 lg:pt-8 text-center font-bold text-defaultYellow ">
      <p className="relative inline-block text-defaultYellow font-bold">
        <span className="absolute inset-0 blur-md text-defaultYellow opacity-60">
          {text}
        </span>
        <span className="relative">{text}</span>
      </p>
    </div>
  );
};
