import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
        
        <div>
          <h3 className="font-bold mb-4">About Maket</h3>
          <ul className="space-y-2">
            {['Login', 'Pricing', 'View Events', 'FAQ', 'Terms and Conditions', 'Report Issues', 'System', 'Compliance'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Celebrate Your Event</h3>
          <ul className="space-y-2">
            {[
              'How to Prepare an Event',
              'How to Create a Competition Event',
              'How to Publish an Event',
              'How to Create a Music Event',
              'How to Manage an Event',
              'How to Create an Attractive Event Concept',
              'How to Host an Event in a Co-Working Space',
            ].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Event Locations</h3>
          <ul className="space-y-2">
            {['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Solo', 'Medan', 'Bali', 'All Cities'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Event Inspiration</h3>
          <ul className="space-y-2">
            {['Festival', 'Concert', 'Sports', 'Workshop & Seminar', 'Theater & Drama', 'Attractions', 'All Categories'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-10 text-center">
        <div className="flex justify-center items-center gap-4">
          <p>Security and Privacy</p>
        </div>
      </div>

      <div className="container mx-auto mt-6 text-center">
        <div className="flex justify-center gap-6">
          <a href="#" className="text-white hover:text-gray-400">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaTiktok className="text-2xl" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaYoutube className="text-2xl" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaFacebook className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
