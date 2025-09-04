import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Services', id: 'services' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const workspaceOptions = [
    'Hot Desk',
    'Dedicated Desk',
    'Private Office',
    'Meeting Room'
  ];

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/90 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">IJURU HUB</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Modern and flexible co-working space in Kimironko, Kigali. 
              Where professionals, entrepreneurs, and innovators come together to work, connect, and grow.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Workspace Options</h4>
            <ul className="space-y-2">
              {workspaceOptions.map((option) => (
                <li key={option}>
                  <span className="text-white/80">{option}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80">42 KG 40 St, Kimironko</p>
                  <p className="text-white/80">Kigali, Rwanda</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/80 flex-shrink-0" />
                <a href="tel:+250798287944" className="text-white/80 hover:text-white transition-colors">
                  +250 798287944
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/80 flex-shrink-0" />
                <a href="mailto:info@ijuruhub.rw" className="text-white/80 hover:text-white transition-colors">
                  info@ijuruhub.rw
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80">Mon-Fri: 8AM-8PM</p>
                  <p className="text-white/80">Sat-Sun: 9AM-5PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for updates on events, special offers, and workspace availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/80">
              © 2024 IJURU HUB. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          <p className="text-white/60 mt-4 text-sm">
            Where Work Meets Community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;