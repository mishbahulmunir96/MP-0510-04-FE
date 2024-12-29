import Link from "next/link";
import React, { FC } from "react";
import LinkHome from "./LinkHome";

interface SignSideElementProps {
  className?: string;
}

const SignSideElement: FC<SignSideElementProps> = ({ className }) => {
  return (
    <div
      className={`${className} hidden h-full flex-col justify-center bg-blue-500 pl-32 text-white md:flex`}
    >
      <LinkHome />

      <div>
        <div className="">
          <p className="mb-2 text-5xl font-extrabold tracking-tight">MAKÉT</p>
        </div>
        <p className="text-lg font-medium">
          Access Your Favorite Events with a Single Click!
        </p>
      </div>
    </div>
  );
};

export default SignSideElement;
