import Link from "next/link";
import React, { FC } from "react";

interface SignSideElementProps {
  className?: string;
}

const SignSideElement: FC<SignSideElementProps> = ({ className }) => {
  return (
    <div
      className={`${className} hidden h-full flex-col justify-center bg-blue-500 pl-32 text-white md:flex`}
    >
      <div className="absolute left-6 top-4 text-lg transition-all duration-300 hover:font-semibold hover:underline">
        <Link href="/">Home</Link>
      </div>

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
