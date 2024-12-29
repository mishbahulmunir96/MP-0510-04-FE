import React, { FC } from "react";

interface SignTitleProps {
  title: string;
  subTitle?: string;
}

const SignTitle: FC<SignTitleProps> = ({ title, subTitle }) => {
  return (
    <div className="mb-6">
      <h1 className="mb-2 text-3xl font-bold text-slate-600">{title}</h1>
      <p className="text-lg font-medium text-slate-700">{subTitle}</p>
    </div>
  );
};

export default SignTitle;
