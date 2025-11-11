import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-green-600 to-[#00549F] text-white py-10  ">
      {/* Top Section */}
      <Container>
        <div className=" px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <img
                src="/logo.png"
                alt="CleanCommunity Logo"
                className="h-20 "
              />
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              A community-driven platform promoting cleanliness, awareness, and
              collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/issues" className="hover:text-white transition">
                  Report Issue
                </a>
              </li>
              <li>
                <a href="/volunteer" className="hover:text-white transition">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-blue-200 transition">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-blue-200 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-200 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-200 transition">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-white/30 my-6 mx-auto "></div>
      </Container>

      {/* Bottom Section */}
      <p className="text-center text-sm text-white/80">
        © {new Date().getFullYear()} CleanCommunity. All Rights Reserved 🌿
      </p>
    </footer>
  );
};

export default Footer;
