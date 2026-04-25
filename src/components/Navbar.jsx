import React, { useEffect, useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { FaUser, FaBriefcase, FaFolderOpen, FaEnvelope, FaLaptopCode } from 'react-icons/fa';
import { motion } from "framer-motion";

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
      className={`site-navbar ${scrolled ? "site-navbar--scrolled" : ""}`}
    >
      <div className='navbar-inner'>
        <Link
          to='/'
          className='navbar-brand'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='navbar-logo' />
          <p className='navbar-name'>
            Tanmay
            <span className='navbar-role'>| Srivastava</span>
          </p>
        </Link>

        <ul className='desktop-nav'>
          {navLinks.map((nav) => {
            const IconComponent = {
              "About": FaUser,
              "Work": FaBriefcase,
              "Skills": FaLaptopCode,
              "Projects": FaFolderOpen,
              "Contact": FaEnvelope
            }[nav.title] || FaUser;

            return (
              <li
                key={nav.id}
                className={`desktop-nav-item ${active === nav.title ? "is-active" : ""}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`} className="desktop-nav-link">
                  <IconComponent className='nav-link-icon' />
                  {nav.title}
                </a>
              </li>
            );
          })}
        </ul>

        <div className='mobile-nav'>
          <button
            type='button'
            className='mobile-menu-button'
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={toggle}
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt=''
              className='mobile-menu-icon'
            />
          </button>

          <div
            className={`mobile-menu-panel ${toggle ? "is-open" : ""}`}
          >
            <ul className='mobile-nav-list'>
              {navLinks.map((nav) => {
                const IconComponent = {
                  "About": FaUser,
                  "Work": FaBriefcase,
                  "Skills": FaLaptopCode,
                  "Projects": FaFolderOpen,
                  "Contact": FaEnvelope
                }[nav.title] || FaUser;

                return (
                  <li
                    key={nav.id}
                    className={`mobile-nav-item ${active === nav.title ? "is-active" : ""}`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    <a href={`#${nav.id}`} className="mobile-nav-link">
                      <IconComponent className='nav-link-icon' />
                      {nav.title}
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
