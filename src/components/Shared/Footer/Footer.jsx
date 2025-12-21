import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="bg-accent mt-8 dark:bg-red-200" >
        <div className="footer sm:footer-horizontal  text-base-content p-10 items-center justify-items-center">

        <nav>
          <h6 className="footer-title">Quick links</h6>
          <Link  className="link link-hover">About us</Link>
          <Link  className="link link-hover">Contact</Link>
        
          <Link  className="link link-hover">Privacy Policy</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a target="blank" href="https://www.facebook.com/mizanur.rahman.481998" className="text-2xl">
              <FaFacebook></FaFacebook>
            </a>
            <a target="blank" href="https://www.instagram.com/mizan_90786/" className="text-2xl">
              <FaInstagram></FaInstagram>
            </a>
            <a target="blank" className="text-2xl">
            <FaX></FaX>
            </a>
          </div>
        </nav>
        </div>
        <div className="footer sm:footer-horizontal footer-center text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
            LiveFlow Donate
            </p>
          </aside>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
