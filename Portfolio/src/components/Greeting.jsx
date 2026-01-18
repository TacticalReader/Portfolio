import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaCloudSun, FaMoon } from "react-icons/fa";

const Greeting = () => {
    const [greeting, setGreeting] = useState("");
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting("Good morning");
            setIcon(<FaSun className="text-yellow-400" />);
        } else if (hour < 18) {
            setGreeting("Good afternoon");
            setIcon(<FaCloudSun className="text-orange-400" />);
        } else {
            setGreeting("Good evening");
            setIcon(<FaMoon className="text-blue-300" />);
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="fixed top-[200px] right-8 z-10 hidden sm:block"
        >
            <div className="relative group p-[2px] rounded-2xl overflow-hidden bg-gradient-to-r from-[#915eff] to-[#804dee] shadow-2xl">
                <div className="bg-[#050816]/90 backdrop-blur-xl rounded-[14px] px-6 py-4 flex items-center gap-4 border border-white/10 group-hover:bg-[#050816]/70 transition-all duration-300">
                    <div className="text-3xl animate-bounce-slow">
                        {icon}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-secondary text-xs font-medium uppercase tracking-wider opacity-80">Welcome back</span>
                        <h3 className="text-white text-[18px] font-bold">
                            {greeting}, <span className="violet-text-gradient">User!</span>
                        </h3>
                    </div>
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#915eff] to-[#804dee] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            </div>
        </motion.div>
    );
};

export default Greeting;
