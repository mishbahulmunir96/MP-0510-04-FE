import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-400">
      <div className="px-4 pt-16 pb-8 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">About Maket</h3>
            <ul className="space-y-3">
              {['Login', 'Pricing', 'View Events', 'FAQ', 'Terms and Conditions', 'Report Issues', 'System', 'Compliance'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-blue-50 hover:text-white transition-colors flex items-center group">
                    <span>{item}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Celebrate Your Event</h3>
            <ul className="space-y-3">
              {[
                'How to Prepare an Event',
                'How to Create a Competition Event',
                'How to Publish an Event',
                'How to Create a Music Event',
                'How to Manage an Event',
                'How to Create an Attractive Event Concept',
                'How to Host an Event in a Co-Working Space',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-blue-50 hover:text-white transition-colors flex items-center group">
                    <span>{item}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Event Locations</h3>
            <ul className="space-y-3">
              {['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Solo', 'Medan', 'Bali', 'All Cities'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-blue-50 hover:text-white transition-colors flex items-center group">
                    <span>{item}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Event Inspiration</h3>
            <ul className="space-y-3">
              {['Festival', 'Concert', 'Sports', 'Workshop & Seminar', 'Theater & Drama', 'Attractions', 'All Categories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-blue-50 hover:text-white transition-colors flex items-center group">
                    <span>{item}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-12 border-t border-blue-400/30" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <a href="#" className="text-blue-50 hover:text-white transition-colors">
              Security and Privacy
            </a>
            <a href="#" className="text-blue-50 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>

          <div className="flex items-center gap-6">
            {[
              { Icon: FaInstagram, label: 'Instagram' },
              { Icon: FaTiktok, label: 'TikTok' },
              { Icon: FaYoutube, label: 'YouTube' },
              { Icon: FaFacebook, label: 'Facebook' }
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="text-blue-50 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-blue-100 text-sm">
          © {new Date().getFullYear()} Maket. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;