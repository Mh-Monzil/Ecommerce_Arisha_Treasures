import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-rose-900 pt-44 lg:pt-32 pb-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Logo and description */}
          <div className="md:col-span-1 text-white">
            <h2 className="text-xl font-bold tracking-tight">
              Arisha&#39;s Treasure
            </h2>
            <p className="mt-4 text-sm ">
              We have clothes that suits your style and which you&#39;re proud
              to wear.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              COMPANY
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              HELP
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Delivery Details
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              FAQ
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Manage Deliveries
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Payments
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              RESOURCES
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Free eBooks
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Development Tutorial
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  How to - Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-gray-900"
                >
                  Youtube Playlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and payment methods */}
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <div className="flex space-x-3">
              <div className="h-8 w-12 bg-white rounded shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">VISA</span>
              </div>
              <div className="h-8 w-12 bg-white rounded shadow-sm flex items-center justify-center">
                <div className="flex">
                  <div className="w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-80 -ml-2"></div>
                </div>
              </div>
              <div className="h-8 w-12 bg-white rounded shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-blue-700">PayPal</span>
              </div>
              <div className="h-8 w-12 bg-white rounded shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold">Apple</span>
              </div>
              <div className="h-8 w-12 bg-white rounded shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-gray-500">G Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
