import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBriefcase, FaFolderOpen, FaEnvelope } from 'react-icons/fa';
import { motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { fadeIn } from "../utils/motion";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Handle transparent/colored/scrolled state
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Handle active section state (Scroll Spy)

      // Guard: Check if we are in the Hero section (above the first nav section)
      // This clears the active state when in the "gap" between top and the first section
      const firstLink = navLinks[0];
      if (firstLink) {
        const element = document.getElementById(firstLink.id);
        if (element && element.parentElement) {
          const sectionTop = element.parentElement.offsetTop;
          // If we are above the activation threshold of the first section
          if (scrollTop < sectionTop - 100) {
            setActive("");
            return;
          }
        }
      }

      // Check if we're at the bottom of the page to activate the last link
      // This helps with short 'Contact' sections
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        // Activate the last nav link
        const lastLink = navLinks[navLinks.length - 1];
        if (lastLink) setActive(lastLink.title);
        return;
      }

      // Iterate through sections to find which one is in view
      for (const nav of navLinks) {
        const element = document.getElementById(nav.id);
        if (element) {
          // The ID is attached to a span inside the section (via SectionWrapper)
          // We need the parent section to get the correct height
          const section = element.parentElement;
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if scroll position is within this section
            // (scrollTop + 100) provides a comfortable offset for highlighting the section as it enters
            if (scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100) {
              setActive(nav.title);
              break; // Stop checking once we find the active section
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      variants={fadeIn("down", "spring", 0.2, 1)}
      initial="hidden"
      animate="show"
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Tanmay &nbsp;
            <span className='sm:block hidden'> | JavaScript Mastery</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
      {navLinks.map((nav) => {
            const IconComponent = {
              "About": FaUser,
              "Work": FaBriefcase,
              "Projects": FaFolderOpen,
              "Contact": FaEnvelope
            }[nav.title] || FaUser;

            return (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer flex items-center gap-2 transition-all duration-300 relative`}
                onClick={() => setActive(nav.title)}
              >
                <IconComponent className={`transition-transform duration-300 ${
                  active === nav.title ? "scale-110" : "scale-100"
                }`} />
                <a href={`#${nav.id}`} className="relative">
                  {nav.title}
                  {active === nav.title && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#915EFF] to-[#FF6B9D] rounded-full animate-pulse"></span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => {
                const IconComponent = {
                  "About": FaUser,
                  "Work": FaBriefcase,
                  "Projects": FaFolderOpen,
                  "Contact": FaEnvelope
                }[nav.title] || FaUser;

                return (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active === nav.title ? "text-white" : "text-secondary"
                    } flex items-center gap-2 transition-all duration-300 relative`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(nav.title);
                    }}
                  >
                    <IconComponent className={`transition-transform duration-300 ${
                      active === nav.title ? "scale-110" : "scale-100"
                    }`} />
                    <a href={`#${nav.id}`} className="relative">
                      {nav.title}
                      {active === nav.title && (
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-[#915EFF] to-[#FF6B9D] rounded-full"></span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
