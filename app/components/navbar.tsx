"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

const Navbar = () => {
  // Simple state for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add scroll state variables
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Set visible based on scroll direction
      if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
        // Scrolling down - hide navbar
        setVisible(false);
      } else {
        // Scrolling up - show navbar
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    // Add scroll event listener with throttling
    let throttleTimeout: any = null;

    const throttleScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          handleScroll();
          throttleTimeout = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttleScroll);

    return () => {
      window.removeEventListener("scroll", throttleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [prevScrollPos]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // CSS class for the typography you specified
  const navLinkStyle =
    "text-white hover:text-amber-500 uppercase font-['poppins'] font-extrabold text-[14px] leading-[100%] tracking-[0.02em]";
  return (
    <div className="z-[49]  isolation:isolate relative ">
      {/* Fixed navbar with transition for hiding */}
      <nav
        className={`fixed top-0 left-0 right-0 bg-black/20 z-[48] transition-transform duration-300 ${
          visible ? "transform-none" : "-translate-y-full"
        }`}
      >
        <div className="container z-[50] mx-auto px-4">
          {/* Mobile layout - center vertically in 67px height */}
          <div className="flex justify-between items-center h-[67px] md:hidden">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative  hover-fix w-20 h-12 transition-transform duration-300 hover:scale-110">
                <Image
                  src="/logo.webp"
                  alt="Lumbini Lions Logo"
                  width={80}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop layout with centered logo and decorative lines */}
          <div className="hidden md:flex md:h-[67px] md:items-center md:justify-center">
            <div className="flex flex-row justify-center items-center w-full relative">
              {/* Navigation links with adjusted spacing */}
              <div className="flex items-center justify-center space-x-6 lg:space-x-8">
                <Link href="/news" className={navLinkStyle}>
                  News
                </Link>
                <Link href="/team" className={navLinkStyle}>
                  Team
                </Link>
                <Link href="/match" className={navLinkStyle}>
                  Match
                </Link>

                {/* Logo container with fixed dimensions */}
                <Link href="/" className="flex-shrink-0 mx-2 md:mt-10 lg:pr-5">
                  <div className={styles.logoWrapper}>
                    <div className={styles.logoContainer}>
                      <Image
                        src="/logo.webp"
                        alt="Lumbini Lions Logo"
                        width={130}
                        height={65}
                        priority
                      />
                    </div>
                  </div>
                </Link>

                <Link href="/gallery" className={navLinkStyle}>
                  Gallery
                </Link>
                {/* <Link href="/shop" className={navLinkStyle}>Shop</Link> */}
                <Link href="/about" className={navLinkStyle}>
                  About
                </Link>
              </div>

              {/* Responsive decorative lines */}
              <div className="absolute left-0 right-0 bottom-7 w-full flex justify-center">
                {/* Left orange line - responsive width using percentages */}
                <div className="absolute right-[50%] bottom-0 mr-[90px] w-[30%] max-w-[300px] h-[0.5px] bg-gradient-to-r from-transparent to-amber-500"></div>

                {/* Right orange line - responsive width using percentages */}
                <div className="absolute left-[50%] bottom-0 ml-[90px] w-[30%] max-w-[300px] h-[0.5px] bg-gradient-to-l from-transparent to-amber-500"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu (unchanged) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[49] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 "
            onClick={closeMenu}
          ></div>

          {/* Menu content */}
          <div className="absolute right-0 top-0 h-full w-64 bg-neutral-900 shadow-lg p-4">
            {/* Close button - top right */}
            <button
              className="absolute top-3 right-3 text-white bg-amber-600 p-2 rounded-full"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile menu logo */}
            <div className="mt-10 mb-6 flex justify-center">
              <Image
                src="/logo.webp"
                alt="Lumbini Lions Logo"
                width={100}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Mobile links */}
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-amber-500 uppercase font-['poppins'] font-bold text-[14px] leading-[100%] tracking-[0.02em] text-center py-2 border-b border-neutral-800"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/news"
                className="text-white hover:text-amber-500 uppercase font-['poppins'] font-bold text-[14px] leading-[100%] tracking-[0.02em] text-center py-2 border-b border-neutral-800"
                onClick={closeMenu}
              >
                News
              </Link>
              <Link
                href="/team"
                className="text-white hover:text-amber-500 uppercase font-['poppins'] font-bold text-[14px] leading-[100%] tracking-[0.02em] text-center py-2 border-b border-neutral-800"
                onClick={closeMenu}
              >
                Team
              </Link>
              <Link
                href="/match"
                className="text-white hover:text-amber-500 uppercase font-['poppins'] font-bold text-[14px] leading-[100%] tracking-[0.02em] text-center py-2 border-b border-neutral-800"
                onClick={closeMenu}
              >
                Match
              </Link>
              <Link
                href="/gallery"
                className="text-white hover:text-amber-500 uppercase font-['poppins'] font-bold text-[14px] leading-[100%] tracking-[0.02em] text-center py-2 border-b border-neutral-800"
                onClick={closeMenu}
              >
                Gallery
              </Link>
              {/* <Link
                href="/shop"
                className="text-white hover:text-amber-500 uppercase font-['poppins'] font-bold text-[14px] leading-[100%] tracking-[0.02em] text-center py-2 border-b border-neutral-800"
                onClick={closeMenu}
              >
                Shop
              </Link> */}
              <Link
                href="/about"
                className="text-white hover:text-amber-500 uppercase font-['poppins'] font-bold text-[14px] leading-[100%] tracking-[0.02em] text-center py-2 border-b border-neutral-800"
                onClick={closeMenu}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
