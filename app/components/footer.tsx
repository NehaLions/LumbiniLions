import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-[#050C13] text-white z-[0] mt-0 md:mt-5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top section with logo and title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center mb-6 md:mb-0">
            <Image
              src="/logo.webp"
              alt="Lumbini Lions Logo"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
            <h2 className="text-4xl font-[poppins] text-amber-500 ml-4">
              LUMBINI LIONS
            </h2>
          </div>

          <div className="flex space-x-4">
            {/* Social icons */}
            <Link
              href="https://www.instagram.com/lumbinilions/"
              className="hover:scale-110 transition-transform"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35 13H35.02M14 4H34C39.5228 4 44 8.47715 44 14V34C44 39.5228 39.5228 44 34 44H14C8.47715 44 4 39.5228 4 34V14C4 8.47715 8.47715 4 14 4ZM32 22.74C32.2468 24.4045 31.9625 26.1044 31.1875 27.598C30.4125 29.0916 29.1863 30.3028 27.6833 31.0593C26.1802 31.8159 24.4769 32.0792 22.8156 31.8119C21.1543 31.5445 19.6195 30.7602 18.4297 29.5703C17.2398 28.3805 16.4555 26.8457 16.1881 25.1844C15.9208 23.5231 16.1841 21.8198 16.9407 20.3167C17.6972 18.8137 18.9084 17.5875 20.402 16.8125C21.8956 16.0375 23.5955 15.7532 25.26 16C26.9578 16.2518 28.5297 17.0429 29.7434 18.2566C30.9571 19.4703 31.7482 21.0422 32 22.74Z"
                  stroke="#F3F3F3"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="https://www.facebook.com/lumbinilions"
              className="hover:scale-110 transition-transform"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36 8H31.2C28.5791 8 26.0669 9.05357 24.2165 10.9271C22.3661 12.8007 21.3333 15.3478 21.3333 18V22.8H16.5333V29.2H21.3333V42H27.7333V29.2H32.5333L34 22.8H27.7333V18C27.7333 17.3513 27.9911 16.7288 28.4537 16.2662C28.9163 15.8036 29.5386 15.5458 30.1872 15.5458H36V8Z"
                  stroke="#F3F3F3"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="https://twitter.com"
              className="hover:scale-110 transition-transform"
            >
              {/* <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 8.00004C42.1374 9.36716 40.0467 10.391 37.8299 11.024C36.6601 9.65857 35.0438 8.73491 33.2555 8.39211C31.4671 8.04931 29.6135 8.30845 28.0053 9.12596C26.3971 9.94347 25.137 11.2712 24.4335 12.9045C23.73 14.5378 23.6242 16.3629 24.1333 18.064V20.064C20.5384 20.1642 16.9916 19.3115 13.8573 17.5945C10.723 15.8775 8.10995 13.3523 6.26662 10.304C6.26662 10.304 -0.533379 25.0347 15.7333 31.5307C11.4882 34.3337 6.40687 35.7106 1.33328 35.552C17.5999 44.048 37.6 35.552 37.6 18.0107C37.5983 17.48 37.5506 16.9508 37.4579 16.4294C39.4428 14.4717 40.8249 11.9467 41.4 9.18937L44 8.00004Z" stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-[poppins] text-amber-500 mb-4">
              <span className="text-amber-500">|</span> Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                className="text-zinc-100 hover:text-amber-500 transition-colors text-lg font-[poppins]"
                href="/about"
              >
                About us
              </Link>
              <Link
                className="text-zinc-100 hover:text-amber-500 transition-colors text-lg font-[poppins]"
                href="/contact"
              >
                Contact us
              </Link>
              {/* <Link className="text-zinc-100 hover:text-amber-500 transition-colors text-lg font-[poppins]" href="/shop">
                                Shop
                            </Link> */}
              <Link
                className="text-zinc-100 hover:text-amber-500 transition-colors text-lg font-[poppins]"
                href="/news"
              >
                News
              </Link>
            </div>
          </div>

          {/* FAQ */}
          {/* <div>
                        <h3 className="text-2xl font-[poppins] text-amber-500 mb-4">
                            <span className="text-amber-500">|</span> Frequently Asked Questions
                        </h3>
                        <ul className="space-y-2">
                            <li className="text-zinc-100 text-lg font-[poppins]">Where can we buy your merchandise?</li>
                            <li className="text-zinc-100 text-lg font-[poppins]">How to sign up for the merchandise giveaways?</li>
                            <li className="text-zinc-100 text-lg font-[poppins]">When is the next home game?</li>
                        </ul>
                    </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-[poppins] text-amber-500 mb-4">
              <span className="text-amber-500">|</span> Contact Information
            </h3>
            <div className="space-y-2">
              <p className="text-zinc-100 text-lg font-[poppins]">
                Email: lumbinilionsnpl@gmail.com{" "}
              </p>
              <p className="text-zinc-100 text-lg font-[poppins]">
                Number: +977 980-1334777
              </p>
              <p className="text-zinc-100 text-lg font-[poppins]">
                Address: Thasikhel, Lalitpur
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} Lumbini Lions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
