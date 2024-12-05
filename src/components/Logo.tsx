import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <p className="animate-bounce text-4xl font-bold text-white">MAKÉT</p>
      </Link>
    </div>
  );
};

export default Logo;
