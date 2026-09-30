import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'How It Works', href: '#planning' },
      { name: 'Safety', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' }
    ],
    travelers: [
      { name: 'Find Travel Buddies', href: '#' },
      { name: 'Popular Destinations', href: '#destinations' },
      { name: 'Travel Tips', href: '#' },
      { name: 'Community', href: '#community' },
      { name: 'Success Stories', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Safety Guidelines', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logo.jpg" alt="TripMates Tamil Nadu Logo" className="h-12 w-12 object-cover rounded-full border-2 border-amber-400 shadow-md" />
              <div>
                <span className="text-2xl font-bold text-white block leading-none">TripMates</span>
                <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">Tamil Nadu • Explore Together</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting adventurous travelers worldwide to create unforgettable journeys and lifelong friendships. Your next great adventure starts with finding the perfect travel companion.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-sky-400" />
                <span>hello@tripmates.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-sky-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-sky-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">For Travelers</h3>
            <ul className="space-y-3">
              {footerLinks.travelers.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-gray-300">
                Get travel tips, destination guides, and exclusive offers delivered to your inbox
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-sky-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-sky-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 Trip Mates. All rights reserved. Made with ❤️ for adventurous travelers.
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-gray-800 p-2 rounded-lg hover:bg-gradient-to-r hover:from-sky-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;