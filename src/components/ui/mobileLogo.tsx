import Link from 'next/link';
import { Ticket } from 'lucide-react';

export const MobileLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative">
        <Ticket className="h-8 w-8 text-white transform rotate-12" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
      </div>
      <div className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-300">
        MAKÉT
      </div>
    </Link>
  );
};

