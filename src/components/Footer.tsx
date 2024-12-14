import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer>
    <div className="bg-blue-400 text-white py-8 gap-4">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <span>© 2024 Maket</span>
          </div>

          <div className="flex flex-wrap space-x-4 mb-4 md:mb-0">
            <Link href="/" className="hover:underline">About</Link>
            <Link href="/" className="hover:underline">Blog</Link>
            <Link href="/" className="hover:underline">Help</Link>
            <Link href="/" className="hover:underline">Careers</Link>
            <Link href="/" className="hover:underline">Press</Link>
            <Link href="/" className="hover:underline">Impact</Link>
            <Link href="/" className="hover:underline">Investors</Link>
            <Link href="/" className="hover:underline">Security</Link>
            <Link href="/" className="hover:underline">Developers</Link>
            <Link href="/" className="hover:underline">Status</Link>
            <Link href="/" className="hover:underline">Terms</Link>
            <Link href="/" className="hover:underline">Privacy</Link>
            <Link href="/" className="hover:underline">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
