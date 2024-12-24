import React from "react";
import Link from "next/link";

interface SignUpPromptProps {
  message?: string;
  text?: string;
  href?: string;
}

const SignPrompt: React.FC<SignUpPromptProps> = ({
  message,
  text,
  href = "/register",
}) => {
  return (
    <div className="flex justify-center text-base font-medium text-slate-800">
      <p>
        {message}{" "}
        <Link
          href={href}
          className="text-blue-700 underline hover:font-semibold"
        >
          {text}
        </Link>
      </p>
    </div>
  );
};

export default SignPrompt;
