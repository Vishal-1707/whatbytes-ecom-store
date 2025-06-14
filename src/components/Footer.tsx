
import React from "react";
import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-white border-t py-6 mt-16 flex flex-col md:flex-row items-center md:justify-between px-8 shadow-inner gap-4">
    <div className="text-gray-500 text-sm">© {new Date().getFullYear()} Whatbytes. All rights reserved.</div>
    <div className="flex gap-4">
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><Github size={20} className="text-gray-400 hover:text-blue-700" /></a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><Twitter size={20} className="text-gray-400 hover:text-blue-700" /></a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><Instagram size={20} className="text-gray-400 hover:text-blue-700" /></a>
    </div>
  </footer>
);

export default Footer;
