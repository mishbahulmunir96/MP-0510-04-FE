import Link from "next/link";
import React, { FC } from "react";

interface LinkHomeProps {
  className?: string;
}

const LinkHome: FC<LinkHomeProps> = ({ className }) => {
  return (
    <div
      className={`${className} absolute left-6 top-4 text-lg transition-all duration-300 hover:font-semibold hover:underline`}
    >
      <Link href="/">Home</Link>
    </div>
  );
};

export default LinkHome;
