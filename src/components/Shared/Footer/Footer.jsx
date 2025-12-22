import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Updated to the more common Twitter/X icon
import { Link } from "react-router";

const Footer = () => {
  

  return (
   <footer className="mt-auto bg-brand-blue">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-800">
              LiveFlow<span className="text-brand-red">Donate</span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Connecting life-savers with those in need. Join our community and make a difference today.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <h6 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">Quick Links</h6>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">About Us</Link>
            <Link to="/contact" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Contact</Link>
            <Link to="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Privacy Policy</Link>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-4">
            <h6 className="text-sm font-bold uppercase tracking-wider text-slate-800">Follow Our Journey</h6>
            <div className="flex gap-4">
              {[FaFacebook, FaInstagram, FaXTwitter].map((Icon, index) => (
                <a key={index} href="#" className="p-3 rounded-full bg-white shadow-sm transition-all hover:scale-110 text-brand-red">
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} <span className="font-bold">LiveFlow Donate</span>.</p>
          <p className="flex items-center gap-1">Made with <span className="text-brand-red">❤</span> in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;