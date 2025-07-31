"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "For Clients", href: "/for-clients" },
    { name: "For Professionals", href: "/for-professionals" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "FAQs", href: "/faqs" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="font-geist fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Nav Links */}
          <div className="flex items-center space-x-10">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-glamlink-teal transition-colors duration-200">
              glamlink
            </Link>

            <div className="hidden lg-custom:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className={`text-sm-custom font-medium transition-colors duration-200 hover:text-glamlink-teal ${isActive(item.href) ? "text-glamlink-teal" : "text-gray-700"}`}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Download App Button */}
          <div className="flex items-center">
            <Link href="https://linktr.ee/glamlink_app" target="_blank" className="hidden lg-custom:block px-6 py-2.5 text-sm-custom font-medium text-white bg-glamlink-teal rounded-full hover:bg-glamlink-teal-dark transition-colors duration-200">
              Download App
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg-custom:hidden relative w-6 h-6 focus:outline-none" aria-label="Toggle navigation">
              <span className={`absolute block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${isOpen ? "rotate-45 top-3" : "top-1"}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-gray-900 transition-all duration-300 top-3 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${isOpen ? "-rotate-45 top-3" : "top-5"}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg-custom:hidden absolute left-0 right-0 top-20 w-full bg-white shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className={`block py-2 px-3 text-sm-custom font-medium transition-colors duration-200 hover:bg-gray-50 rounded ${isActive(item.href) ? "text-glamlink-teal bg-gray-50" : "text-gray-700"}`}>
                  {item.name}
                </Link>
              ))}
              <Link href="https://linktr.ee/glamlink_app" target="_blank" onClick={() => setIsOpen(false)} className="block w-full text-center py-2.5 px-3 text-sm-custom font-medium text-white bg-glamlink-teal rounded-full hover:bg-glamlink-teal-dark transition-colors duration-200">
                Download App
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
