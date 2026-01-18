import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaRocket } from "react-icons/fa";

const CTAButtons = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Threshold for hero section visibility
            if (window.scrollY > 400) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleViewWork = () => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleDownloadResume = () => {
        // Update this path to your actual resume file location
        window.open("/resume.pdf", "_blank");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -20, x: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed top-[88px] right-8 z-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
                >
                    {/* Primary CTA Button */}
                    <motion.button
                        onClick={handleViewWork}
                        className="cta-button group relative px-6 py-3 rounded-lg font-semibold text-white overflow-hidden shadow-lg"
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#915eff] via-[#804dee] to-[#915eff] bg-[length:200%_100%] animate-gradient" />
                        <div className="relative flex items-center gap-2 z-10">
                            <FaRocket className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                            <span>View My Work</span>
                        </div>
                        {/* Pulse effect */}
                        <div className="absolute inset-0 rounded-lg animate-pulse-ring" />
                    </motion.button>

                    {/* Secondary Download Link */}
                    <motion.a
                        href="/resume.pdf"
                        download
                        onClick={(e) => {
                            e.preventDefault();
                            handleDownloadResume();
                        }}
                        className="flex items-center gap-2 px-4 py-3 text-secondary hover:text-white font-medium transition-all duration-300 border border-secondary/30 hover:border-[#915eff] rounded-lg backdrop-blur-sm bg-black/20 hover:bg-[#915eff]/10"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaDownload className="text-sm" />
                        <span className="text-sm sm:text-base">Download Resume</span>
                    </motion.a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CTAButtons;
